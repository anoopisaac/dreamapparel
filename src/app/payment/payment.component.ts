import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { StripePaymentState, PurchaseData, MessageBox, MessageType, ChallengeState } from 'src/common';
import { State } from '../state.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FireService } from '../fire.service';
import { UtilService } from '../util.service';
import { ValidationService } from '../validation.service';
import { RemoteService } from '../remote.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../base/base.component';
declare var paypal;
declare var dataLayer: any;
declare var mobileCheck: any;



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent extends BaseComponent implements OnInit {
  @Output() close = new EventEmitter<any>();
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  window = window;
  ChallengeState = ChallengeState;
  product = {
    price: 2,
    description: 'scratch challenge'
  };

  constructor(public state: State, private fireService: FireService, private validationService: ValidationService, private utilService: UtilService) {
    super(state);
  }

  challengeState: ChallengeState;
  orderId: string;
  userEmail: string = '';

  async ngOnInit() {
    super.ngOnInit();
    this.challengeState = ChallengeState.INIT;
    window['pay'] = this;
    this.setupPaypalPayment();
    this.compId = 'payment';
  }


  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

  private setupPaypalPayment() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ],
            application_context: {
              brand_name: "Games at Beach Red",
              shipping_preference: "NO_SHIPPING"
            }
          });
        },
        onApprove: async (data, actions) => {
          this.challengeState = ChallengeState.PAYMENT_APPROVED;
          const paymeComp = this;
          try {
            const order = await actions.order.capture().then(function (details) {
              paymeComp.onPaymentCapture(details.payer.email_address, data.orderID);
            });
            console.log(order);
          } catch (err) {
            this.state.dialogMessage = new MessageBox(`An error occured while capturing payment. We will get in touch with you shortly`, () => {
              paymeComp.utilService.addToDataLayer('payment', 'payment', 'paypal', 'capture_failed');
              paymeComp.challengeState = ChallengeState.PAYMENT_CAPTURE_FAILED;
            }, MessageType.INFO);
          }
        },
        onError: err => {
          this.utilService.addToDataLayer('payment', 'payment', 'paypal', 'approve_failed');
          this.state.dialogMessage = new MessageBox(`An error occured while processing the payment. Please try again after some time.`, () => {
          }, MessageType.INFO);
          console.log(err);
          this.challengeState = ChallengeState.PAYMENT_FAILED;
        },
        style: {
          color: 'blue',
          // shape: 'pill',
          label: 'pay',
          height: 30,
          size: 'small'
        }
      })
      // .render(this.paypalElement.nativeElement);
      .render(this.paypalElement.nativeElement);
  }

  cards: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  selectedCardIndexes: number[] = [];
  showCallengeResponseMessage = false;

  /**
   * invoked when the payment is finally approved by paypal.
   * @param email 
   * @param orderId 
   */
  onPaymentCapture(email: string, orderId: string) {
    this.userEmail = email;
    // Call your server to save the transaction
    this.orderId = orderId;
    this.challengeState = ChallengeState.PAYMENT_CAPTURED;
    this.animClass = 'fade-in';
    this.utilService.addToDataLayer('payment', 'payment', 'paypal', 'capture_success');
  }
  isCardSelected(cardIndex): boolean {
    return this.selectedCardIndexes.indexOf(cardIndex) > -1;
  }
  onCardClick(selCardIndex: number) {
    if (this.challengeState !== ChallengeState.PAYMENT_CAPTURED) {
      this.state.dialogMessage = new MessageBox(`Please make the payment to activate the cards`, () => {
      }, MessageType.INFO);
      return;
    }
    // checking if already present
    const isPresent = this.selectedCardIndexes.indexOf(selCardIndex) > -1;
    if (isPresent) {
      this.selectedCardIndexes = this.selectedCardIndexes.filter(itCardIndex => itCardIndex !== selCardIndex);
    } else {
      this.selectedCardIndexes.push(selCardIndex);
    }
  }

  /**
   * submitting challenge to see if the user wins or not
   */
  async submitChallenge() {
    if (this.selectedCardIndexes.length === 0) {
      this.state.dialogMessage = new MessageBox(`Please select a card before you submit.`, () => {
      }, MessageType.INFO);
      return;
    } else if (this.selectedCardIndexes.length > 1) {
      this.state.dialogMessage = new MessageBox(`Please select only one card.`, () => {
      }, MessageType.INFO);
      return;
    }
    this.utilService.addToDataLayer('challenge', 'challenge', 'submit');
    const payComp = this;
    const token = await this.state.user.getIdToken();
    try {
      this.toggleSpinner();
      const response = await fetch(`${environment.cloudfnhost}/tt/select-card`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          // orderId: '5YM4081277666343N',
          orderId: this.orderId,
          selectedCardNum: 1
        })
      });
      const challResp = await response.json();
      const challRespStatus = response.status;
    console.log('json', challResp, challRespStatus);

      if (challRespStatus === 200) {
        const challState = challResp.challengeState;
        // this will be either challene failed or succeeded.
        // payComp.challengeState = challState;
        payComp.resetCardState(challState);
        const label = challState === ChallengeState.CHALLENGE_SUCCESS ? 'success' : 'fail';
        this.utilService.addToDataLayer('challenge', 'challenge', '200', label);
        payComp.showCallengeResponseMessage = true;
      } else if (challRespStatus === 403) {
        // payComp.challengeState = ChallengeState.CHALLENGE_FAILED;
        this.state.dialogMessage = new MessageBox(challResp.message, () => {
          payComp.resetCardState(ChallengeState.CHALLENGE_FAILED);
          payComp.utilService.addToDataLayer('challenge', 'challenge', '403', 'fail');
        }, MessageType.INFO);
      }
    } catch (err) {
      console.log('error', err);
      this.state.dialogMessage = new MessageBox(`Error occured while processing the challenge. We will check the status and will refund your money`, () => {
        payComp.resetCardState(ChallengeState.CHALLENGE_FAILED);
        payComp.utilService.addToDataLayer('challenge', 'challenge', 'error', 'fail');
      }, MessageType.INFO);
    }
    this.toggleSpinner();
  }

  // variable holding kind of animation that needs to applied.
  animClass = '';
  spinnerClass = '';
  isProcessingChallenge = false;

  resetCardState(challState: ChallengeState) {
    this.selectedCardIndexes = [];
    this.challengeState = challState;
  }

  toggleSpinner() {
    this.spinnerClass = this.spinnerClass === '' ? 'spinner' : '';
    this.isProcessingChallenge = !this.isProcessingChallenge;
  }
  testSubmitChallenge() {
    // this.onPaymentCapture('werwer@werew.com', '5YM4081277666343N')
    this.onPaymentCapture('werwer@werew.com', '25493854DE923650G')
    this.submitChallenge();
  }

  testEmailConfirmation(param = 1) {
    if (param === 1) {
      this.resetCardState(ChallengeState.CHALLENGE_SUCCESS);
    } else {
      this.resetCardState(ChallengeState.CHALLENGE_FAILED);
    }
    this.showCallengeResponseMessage = true;
  }

  displayPaypalButton(): string {
    return (this.challengeState === ChallengeState.INIT || this.challengeState === ChallengeState.PAYMENT_FAILED) ? 'grid' : 'none';
  }

  showStartOverButton(): boolean {
    return this.challengeState === ChallengeState.CHALLENGE_FAILED || this.challengeState === ChallengeState.CHALLENGE_SUCCESS;
  }
  showSubmitButton(): boolean {
    return this.challengeState === ChallengeState.PAYMENT_CAPTURED;
  }



  checkProfit() {
    const numClicked = 10000;
    // assuming 20% who came to the sight played.
    let numOpted = numClicked * .2;
    // out of 10 50% played again
    const costForAquiring = numClicked * 1;
    let totalChallengesTaken = 0;
    let successCounts = 0;
    const numCards = 9;
    Array(numOpted).fill(1).forEach(it => {
      let cardsLeft = Array(numCards).fill(1).map((val, index) => index + 1)
      // assumming on average people will play 4 to 7 games
      // let challengesPerPlay = Math.ceil(Math.random() * 4) + 2
      let challengesPerPlay = 1;
      totalChallengesTaken += challengesPerPlay;
      const winningCardNum = Math.ceil(Math.random() * numCards);
      // some is actually meant to see if call back return true for any of the elements, but we are using it here to break the loop
      Array(challengesPerPlay).fill(1).some(challenge => {
        const userSelectedNum = Math.ceil(Math.random() * cardsLeft.length);
        const userSelectedCard = cardsLeft[userSelectedNum - 1]
        // console.log('cards left', cardsLeft, 'userSelectedCard', userSelectedCard, 'winningCardNum', winningCardNum);
        if (userSelectedCard === undefined) {
          console.error('');
          throw 'error'
        }
        if (winningCardNum === userSelectedCard) {
          successCounts++;
          return true
        } else {
          cardsLeft = cardsLeft.filter(itCard => itCard !== userSelectedCard)
        }
      });
      // console.log('successCount', successCounts, 'totalChallengesTaken', totalChallengesTaken, 'challengesPerPlay', challengesPerPlay);
      // console.log('next user============>');
    });

    console.log('numOpted', numOpted, 'successCount', successCounts, 'totalChallengesTaken', totalChallengesTaken);
    const totalProfit = (totalChallengesTaken * 1.8 - (successCounts * 10));
    console.log('totalProfit', totalProfit, 'per user', (totalProfit / numOpted), 'per clicked', (totalProfit / numClicked));
  }

  getCards(): number[] {
    return Array(9).fill(1);
  }

  getTitle(): string {
    return this.challengeState === ChallengeState.INIT ? "please make the payment to start the game" : "";
  }

  isEmailValid = true;
  submitEmail(email: string) {
    this.isEmailValid = this.validationService.isValidEmail(email);
    if (this.isEmailValid) {
      try {
        this.fireService.updateObject(`/challenges/${this.orderId}`, { email })
        console.log('updated');
        this.showCallengeResponseMessage = false;
      } catch (err) {
        this.state.dialogMessage = new MessageBox(`Error occured while updating the email`, () => {
        }, MessageType.INFO);
      }
    } else {
      return;
    }
  }

  /**
   * gets invoked when user clicks on share button
   */
  onShare(media: string) {
    // console.log('on click of share',);
    this.utilService.addToDataLayer('affiliate', 'affiliate', 'abouttoshare', media, this.state.user.uid);
  }

  getShareLink(media: string) {
    switch (media) {
      case 'facebook': {
        return `https://www.facebook.com/sharer/sharer.php?u=https://games.beachred.com/play/ref/${this.state.appUser.challShareId}`
      }
      case 'pinterest': {
        return `https://pinterest.com/pin/create/button/?url=https://games.beachred.com/play/ref/${this.state.appUser.challShareId}&image_url=https://games.beachred.com/assets/aim.svg&description=A chance to win $10 Amazon gift card`
        // https://pinterest.com/pin/create/button/?url=https://games.beachred.com&media=https://games.beachred.com/assets/console.png&description=A chance to win $10 Amazon gift card
      }
      case 'email': {
        return `https://games.beachred.com/play/ref/${this.state.appUser.challShareId}`
      }
      case 'whatsapp': {
        const url = 'whatsapp://send?text=';
        const text = `Check out this site to win $10 Amazon gift card and more..  https://games.beachred.com/play/ref/${this.state.appUser.challShareId}`;
        const encodedText = encodeURIComponent(text);
        return url + encodedText
        // return `whatsapp://send?text=https://games.beachred.com/play/ref/${this.state.appUser.challShareId}`
      }
      case 'ccb': {
        return `https://games.beachred.com/play/ref/${this.state.appUser.challShareId}`
      }
    }
  }

  decorateWhatsAppLink() {
    //set up the url
    const url = 'whatsapp://send?text=';

    //define the message text
    const text = 'Check out this site to win $10 Amazon gift card and more..  https://games.beachred.com';

    //encode the text
    const encodedText = encodeURIComponent(text);

    //find the link
    const whatsappElm = document.querySelector('.whatsapp');

    //set the href attribute on the link
    whatsappElm.setAttribute('href', url + encodedText);
  }

  isUserAgenMobile(): boolean {
    return mobileCheck();
  }
  copyToClipBoard(text: string) {
    event.preventDefault();
    event.stopPropagation();
    /* Get the text field */
    const copyText: HTMLInputElement = <HTMLInputElement>document.getElementById("ccb");
    copyText.value = text;

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/

    /* Copy the text inside the text field */
    document.execCommand("copy");

    /* Alert the copied text */
    alert("Copied the link " + copyText.value);
  }

}
