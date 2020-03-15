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

export enum CategoryType {
  MEN = 'MEN', WOMEN = 'WOMEN', BOY = 'BOYS', GIRL = 'GIRLS', INFANT = 'INFANT'
}
export enum SubCategoryType {
  VNECK = 'V neck', ROUDNECK = 'Round neck', ROMPERS = 'Rompers'
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

export class Cart {
  productLines: ProductLine[] = [];
}
export class ProductLine {
  qty: number;
  productSku: ProductSku;
  price: number;
}

export class Order {
  productLines: ProductLine[] = [];
  shippingAddress: Address;
  billingAddress: Address;
  totalAmt: number;
  orderStatus: OrderStatus;
}
export enum CartStatus {
  CREATED = 'created', SHIPPING_ADDRESS_ADDED = 'shipping-addr-added', BILLING_ADDRESS_ADDED = 'billing-addr-added', PAYMENT_DETAILS_ADDED = 'shipping-addr-added'
}
export enum OrderStatus {
  CREATED = 'created', PAYMENT_SUCCESS = 'payment-success', PAYMENT_PROCESSING = 'payment-processing'
}

export class Address {
  fName: string;
  lName: string;
  line1: string;
  line2: string;
  citry: string;
  state: string;
  country: string;
  phone: number;
  pin: number;
}

export enum CountryStates {
  KERALA = 'kerala'
}

export class Product {
  // this folder contains all the images for different colors for a particular product type, for ex: all colors for men vneck
  prodImgFolderName: string;
  title: string;
  description: string;
  id: string;
  colorKeys: ColorKey[] = [];
  sizeVariants: ProductSizeVariant[] = [];
  categoryType: CategoryType;
  subCategoryType: SubCategoryType;
  __designs?: ProductDesign[] = [];
}
export class ColorVariant {
  // even though price doesnt change, there are different images for differernt colors
  constructor(public colorKey: string, public imgFileName: string, public colorValue: string) {

  }
}
export enum ColorKey {
  MAROON = 'Maroon', PURPLE = 'Purple', YELLOW = 'Yellow', RED = 'Red', SKYBLUE = 'Sky Blue', BLACK = 'Black', CHARCOALMELANGE = 'Charcoal Melange', GREEN = 'Green', GREYMELANGE = 'Grey Melange', NAVYBLUE = 'Navy Blue', ROYALBLUE = 'Royal Blue', WHITE = 'White', FLAGGREEN = 'Flag Green', GOLDENYELLOW = 'Golden Yellow', COFFEEBROWN = 'Coffee Brown', PETROLBLUE = 'Petrol Blue', STEELGREY = 'Steel Grey', BRICKRED = 'Brick Red', OLIVEGREEN = 'Olive Green'
}
export class ProductSku {
  productType: ProductType;
  sizeVariant: ProductSizeVariant;
  colorVariantId: ColorVariant;
  // we will do a combination of product type and the below design to get the palcement
  designId: string;

}

/**
 * this will be specific for each product for ex: men v neck will have different image size compare to women vneck even though image is same
 */
export class ProductDesign {
  // holds the design id pointing to image design
  designId: string;
  // you might need mapping directly with size variant with is different for different size variant
  prodType: ProductType;
  width: number;
  height: number;
  // how far is image placed from the top.
  top: number;
  __isMouseOver?= false;
}

// /**
//  * stores the location of the image and also the size width and the placement
//  */
// export class ProductImageMapping {
//   prodId: string;
//   // location of images
//   imgPosId: string;
//   imgDataId: string;
// }

export class Category {
  public __selected = false;
  constructor(public type: CategoryType, public subCategories: SubCategory[]) {
  }
}
export class SubCategory {
  public __selected = false;
  constructor(public type: SubCategoryType) {

  }
}

export enum ProductType {
  MEN_VNECK = 'MEN_VNECK', WOMEN_VNECK = 'WOMEN_VNECK', MEN_ROUND_NECK = 'MEN_ROUND_NECK', WOMEN_ROUND_NECK = 'WOMEN_ROUND_NECK'
}

// export enum ImageDesignKey {
//   CARS_MUSTANG = 'CARS_MUSTANG', KIDS_CUTE_ANIMALS = 'KIDS_CUTE_ANIMALS', KIDS_CUTE_ANIMALS_WATER_COLOR = 'KIDS_CUTE_ANIMALS_WATER_COLOR'
// }
export enum ImageDesignType {
  CARS_MUSTANG = 'CARS_MUSTANG', KIDS_CUTE_ANIMALS = 'KIDS_CUTE_ANIMALS', KIDS_CUTE_ANIMALS_WATER_COLOR = 'KIDS_CUTE_ANIMALS_WATER_COLOR'
}

export class DesignImage {
  designId: string;
  // some cases several designs belongs to one group and the placing will be same, for those we will get 
  designType: ImageDesignType;
  // what kind of image, is it car, animal etc
  tagName: string;
  folderName: string;
  imageName: string;
}

export class ProductSizeVariant {
  size: Size;
  price: number;
}

export enum Size {
  SMALL = 'S', MEDIUM = 'M', LARGE = 'L', XLARGE = 'XL', XXLARGE = 'XXL'
}
/**
 * this is used to validate form fields
 */
export class FieldValidator {
  public errMessage = '';
  constructor(public fieldName: string, public displayName: string, public validatorTypes = ['']) {
  }
}
