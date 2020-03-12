import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { AppUser, Earning } from 'src/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  constructor() { }

  async addUser(user: firebase.User, srcChallShareId: string): Promise<AppUser> {
    const token = await user.getIdToken();
    console.log('token', token);
    const response = await fetch(`${environment.cloudfnhost}/tt/add-user`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        // orderId: '5YM4081277666343N',
        srcChallShareId
      })
    });
    console.log('response', response);
    const appUser = await response.json();
    return <AppUser>appUser;
    // console.log('json', appUser, status);
  }


  async getReferralAmt(user: firebase.User): Promise<Earning> {

    try {
      const response = await fetch(`${environment.cloudfnhost}/tt/get-earnings`, {
        method: 'post',
        headers: await this.getHeader(user)
      });
      console.log('response', response);
      const earnings: Earning = await response.json();
      const status = response.status;
      console.log('json', earnings);
      // return parseFloat(refAmt.affiliateAmount)
      return earnings;
    } catch (err) {
      console.log('error', err);
    }

  }

  async getHeader(user: User) {
    const token = await user.getIdToken();
    return {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }

}


