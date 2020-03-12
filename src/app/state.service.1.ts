import { Injectable } from '@angular/core';
import { MessageBox, ContactUsForm, AppUser, Earning } from 'src/common';
import { BaseComponent } from './base/base.component';

@Injectable({
  providedIn: 'root'
})
export class State {

  constructor() {
    window['state'] = this;
  }
  dialogMessage: MessageBox;
  user: firebase.User;
  earnings: Earning;
  appUser: AppUser;
  contactForm: ContactUsForm;
  components: BaseComponent[] = [];

  /**
   * this is invoked soon after user is added  
   */

}
