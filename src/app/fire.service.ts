import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PurchaseData, Base, ContactUsForm } from 'src/common';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { State } from './state.service';
import { FirebaseApp } from '@angular/fire';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class FireService {



  constructor(private state: State, private firestore: AngularFirestore, private firebase: FirebaseApp, private utilService: UtilService) {
  }


  createUser() {
    return this.firebase.firestore().collection('users').add({
      name: 'anoop',
      nameToSearch: 'anoop',
      surname: 'isaac',
      age: 10
    });
  }

  async getUserPurchaseData(uid: string): Promise<PurchaseData> {
    const docRef = this.firebase.firestore().doc(`/users/${uid}`);
    // this might be empty if user hasnt created any page.
    const doc = await docRef.get();
    if (doc.data() === undefined) {
      return undefined;
    } else {
      return doc.data()['purchase'];
    }

  }



  getSettings(): Promise<any> {
    const query = this.firestore.doc(``).ref;
    return query.get();
  }


  insertContactUs(contactus: ContactUsForm) {
    const rawContactUs = this.utilService.rawCopy(contactus, false);
    const randomAlphaId = this.utilService.getUniqueId();
    return this.firestore.collection('/contactus').doc(randomAlphaId + '|' + contactus.email).set(rawContactUs).then(status => {
      // console.log('insert comment success');
    }).catch(error => {
      console.error('error', error);
    })
  }


  /**
   * updating object inside fire  
   * @param docLocation 
   * @param subPath 
   * @param updateObj 
   */
  async updateObject(docLocation: string, updateObj: {}) {
    updateObj = this.utilService.rawCopy(updateObj, false);
    try {
      const status = await this.firestore.doc(docLocation).set(updateObj, { merge: true });
    } catch (err) {
      throw err;
    }
  }


  /**
   * deleting a document in fires
   * @param docLocation 
   */
  deleteDocument(docLocation: string) {
    console.log('docloc', docLocation);
    this.firestore.doc(docLocation).delete().then(status => {
      console.log('success', status);
    }).catch(error => {
      console.error('error', error, docLocation);
    });
  }


  async signInAnonymous(): Promise<firebase.User> {
    try {
      const userCredential = await firebase.auth().signInAnonymously();
      const user = userCredential.user;
      return user;
    } catch (err) {
      console.error('reached in f error', err);
      throw err;
    }

  }

}
