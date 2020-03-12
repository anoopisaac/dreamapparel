import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ScratchComponent } from './scratch/scratch.component';
import { PaymentComponent } from './payment/payment.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms'


// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FireService } from './fire.service';
import { UtilService } from './util.service';
import { StripeCheckoutComponent } from './stripe-checkout/stripe-checkout.component';
import { SvgIconComponent } from './svg-icon/svg-icon.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RemoteService } from './remote.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { BaseComponent } from './base/base.component';
import { ActionService } from './action.service';


@NgModule({
  declarations: [
    AppComponent,
    ScratchComponent,
    PaymentComponent,
    MessageBoxComponent,
    StripeCheckoutComponent,
    SvgIconComponent,
    ContactUsComponent,
    AffiliateComponent,
    BaseComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [FireService, UtilService, RemoteService, ActionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
