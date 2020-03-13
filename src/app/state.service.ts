import { Injectable } from '@angular/core';
import { MessageBox, Earning, AppUser, ContactUsForm, Product, Cart, Size, ImagePosition, ImageData, ImageType, ProductType, Category } from 'src/common';
import { BaseComponent } from './base/base.component';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class State {

  constructor() { }

  dialogMessage: MessageBox;
  categories: Category[] = [new Category('Men', 'men'), new Category('Women', 'women'), new Category('Kid', 'kid'), new Category('Infant', 'infant')];
  user: User
  earnings: Earning;
  appUser: AppUser;
  contactForm: ContactUsForm;
  components: BaseComponent[] = [];
  products: Product[] = [];
  cart: Cart;
  imagePositions: ImagePosition[] = [];
  imageData: ImageData[] = [];
  // single prod might have so many images associated to it
  // prodImageMapping: ProductImageMapping[] = [];

  setupForTesting() {
    this.products = [{
      title: 'v neck',
      description: `v neck well qualified`,
      id: ProductType.MEN_VNECK,
      colors: ['red', 'blue'],
      sizeVariants: [{ size: Size.LARGE, price: 10 }]
    }]
    this.imagePositions = [{ imgDataId: ImageType.CARS_MUSTANG, width: 34, height: 34, top: 15, prodId: ProductType.MEN_VNECK }];
    this.imageData = [{ imgId: ImageType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars', imageNames: ['car1.png', 'car2.png'] }]
    // this.prodImageMapping = [{ imgDataId: 'cars-mustang', imgPosId: 'vneck-men-cars', prodId: 'v' }]
  }
}
