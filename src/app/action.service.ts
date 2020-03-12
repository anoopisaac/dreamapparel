import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { State } from './state.service';
import { RemoteService } from './remote.service';
import { UtilService, isNotBlank } from './util.service';
declare var dataLayer: any;

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private fireService: FireService, private state: State, private remoteService: RemoteService, private utilService: UtilService) { }

  /**
   * gets invoked from app compoent to create user
   */
  async handleUserCreation() {
    const user = await this.fireService.signInAnonymous();
    this.state.user = user;
    // this can be called as  a hack to see if the affilaite component is on, populate the amt ow leave it.
    const affiliateComp = this.utilService.getComponent('affiliate');
    if (affiliateComp !== undefined) {
      this.remoteService.getReferralAmt(this.state.user).then(earnings => {
        this.state.earnings = earnings;
      })
    }
    // const srcChallShareId = window.location.pathname.replace(/\/ref\//, '')
    const loc = window.location.pathname;
    const match = loc.match(/play\/ref\/([^\/]+)/)

    // const srcChallShareId = 'k7fsdgrogfljdcc55l'
    const srcChallShareId = match !== null ? match[1] : '';
    console.log('srcChallShareId', srcChallShareId);
    if (isNotBlank(srcChallShareId)) {
      this.utilService.addToDataLayer('affiliate', 'affiliate', 'onsharedlink', srcChallShareId)
    }
    // iam adding the user in teh db with source of  challenge shared id 
    // const srcChallShareId = params['refId'];
    this.remoteService.addUser(this.state.user, srcChallShareId).then(user => {
      this.state.appUser = user;
    })
  }
}
