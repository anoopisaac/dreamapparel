import { Component, OnInit } from '@angular/core';
declare var Stripe: any;
@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.scss']
})
export class StripeCheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window['scheckout']
  }

  async showCheckout(sessionId: string) {
    const stripe = Stripe('pk_live_fsh9aU58BH11qxEksn4V60nS00RwYYOOBs');
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  }

}
