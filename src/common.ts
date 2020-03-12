export class PurchaseData {
  country: string; amtInCurrentCurreny: number; stripeAmt: number; amtInUSD: number; item: string; currency: string; state: StripePaymentState
}
export enum StripePaymentState {
  NONE = 'nne', INITIAL = 'init', INTENT = 'intent', PROCESSING_ON = 'processing', PAYMENTSUCCEEDED = 'done', PAYMENTFAILED = 'failed'
}

export class MessageBox {
  constructor(public message: string, public callback: (status?: boolean) => any, public type: MessageType) {
  }
}
export enum MessageType {
  SAVE_NEW_STYLE, CONFIRMATION, INFO, CONFIRM_EMAIL
}

export class Base {
  baseId: string;
}

export interface Earning {
  affiliateAmount: number, gamingAmount: number;
}

export enum ChallengeState {
  INIT = 'init', PAYMENT_APPROVED = 'payapproved', PAYMENT_CAPTURED = 'paycaptured', PAYMENT_FAILED = 'payfailed', CHALLENGE_SUCCESS = 'success', CHALLENGE_FAILED = 'failed', PAYMENT_CAPTURE_FAILED = 'paycapturefailed'
}

export class ContactUsForm {
  constructor(public fName = '', public lName = '', public email = '', public content = '') {
  }
}

export interface AppUser {
  uid: string, challShareId: string, challSrcUid: string
}

/**
 * this is used to validate form fields
 */
export class FieldValidator {
  public errMessage = '';
  constructor(public fieldName: string, public displayName: string, public validatorTypes = ['']) {
  }
}
