import { Injectable } from '@angular/core';
import { MessageBox, Earning, AppUser, ContactUsForm, Product, Cart, Size, ProductDesign as ProductDesign, ProductType, Category, CategoryType, SubCategoryType, SubCategory, ColorVariant, ColorKey, ProductSku, DesignImage, ImageDesignType, } from 'src/common';
import { BaseComponent } from './base/base.component';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class State {

  constructor() {
    this.setupForTesting();
  }

  selectedCategory: Category;
  selectedSubCategory: SubCategory;
  dialogMessage: MessageBox;
  categories: Category[] = [];
  user: User
  earnings: Earning;
  masterColorVariants: ColorVariant[] = [];
  appUser: AppUser;
  contactForm: ContactUsForm;
  components: BaseComponent[] = [];
  products: Product[] = [];
  cart: Cart;
  // we will use this one as the mapping for product type and design
  productDesigns: ProductDesign[] = [];
  desingData: DesignImage[] = [];
  // single prod might have so many images associated to it
  // prodImageMapping: ProductImageMapping[] = [];

  setupForTesting() {
    this.setupCategories();
    this.setupMasterColorVariants();
    this.setDesignData();
    this.setProductDesignMapping();
    this.setProductData();
    // this.prodImageMapping = [{ imgDataId: 'cars-mustang', imgPosId: 'vneck-men-cars', prodId: 'v' }]
  }

  /**
   * set master designs and how a design needs to positioned for a particular product.
   */
  private setDesignData() {
    this.desingData = [
      { designId: 'mustang-01', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-01.png' },
      { designId: 'mustang-02', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-02.png' },
      { designId: 'mustang-03', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-03.png' },
      { designId: 'mustang-04', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-04.png' },
      { designId: 'mustang-05', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-05.png' },
      { designId: 'mustang-06', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-06.png' },
      { designId: 'mustang-07', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-07.png' },
      { designId: 'mustang-08', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-08.png' },
      { designId: 'mustang-09', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-09.png' },
      { designId: 'mustang-10', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-10.png' },
      { designId: 'mustang-11', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-11.png' },
      { designId: 'mustang-12', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-12.png' },
      { designId: 'mustang-13', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-13.png' },
      { designId: 'mustang-14', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-14.png' },
      { designId: 'mustang-15', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-15.png' },
      { designId: 'mustang-16', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-16.png' },
      { designId: 'mustang-17', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-17.png' },
      { designId: 'mustang-18', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-18.png' },
      { designId: 'mustang-19', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-19.png' },
      { designId: 'mustang-20', designType: ImageDesignType.CARS_MUSTANG, tagName: 'cars', folderName: 'cars-mustang', imageName: 'mustang-20.png' },
    ]
  }

  private setProductDesignMapping() {
    this.productDesigns = [
      { designId: 'mustang-01', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-02', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-03', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-04', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-05', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-06', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-07', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-08', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-09', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-10', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-11', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-12', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-13', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-14', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-15', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-16', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-17', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-18', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-19', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
      { designId: 'mustang-20', prodType: ProductType.MEN_VNECK, width: 30, top: 40 },
    ];
  }



  /**
   * this will go through the all the options size variants, colors and images for each product type and create product for each of the combinations 
   */
  setProductData() {
    // first deal with male v neck first
    const menVneck: Product = {
      prodImgFolderName: ProductType.MEN_VNECK,
      title: 'v neck',
      description: `v neck well qualified`,
      id: ProductType.MEN_VNECK,
      colorKeys: [ColorKey.GOLDENYELLOW, ColorKey.MAROON, ColorKey.PURPLE, ColorKey.RED, ColorKey.STEELGREY, ColorKey.BRICKRED, ColorKey.OLIVEGREEN, ColorKey.SKYBLUE, ColorKey.CHARCOALMELANGE, ColorKey.GREEN, ColorKey.GREYMELANGE, ColorKey.ROYALBLUE, ColorKey.WHITE, ColorKey.FLAGGREEN],
      categoryType: CategoryType.MEN,
      subCategoryType: SubCategoryType.VNECK,
      sizeVariants: [{ size: Size.SMALL, price: 10 }, { size: Size.MEDIUM, price: 10 }, { size: Size.LARGE, price: 10 }, { size: Size.XLARGE, price: 10 }],
      __designs: this.getDesignsByProduct(ProductType.MEN_VNECK)
    }
    this.products = [menVneck];
  }

  /**
   * get all the mapped designs for a product type for ex: men vneck
   * @param productType 
   */
  getDesignsByProduct(productType: ProductType): ProductDesign[] {
    const productDesigns: ProductDesign[] = this.productDesigns.filter(prodDesign => prodDesign.prodType === productType);
    return productDesigns;
  }
  getDesignsById(designId: string): DesignImage {
    return this.desingData.find(itDesign => itDesign.designId === designId);
  }

  setupCategories() {
    // this.categories = [, new Category(CategoryType.WOMEN), new Category(CategoryType.KID), new Category(CategoryType.INFANT)];

    const roudneckSubCategory = new SubCategory(SubCategoryType.ROUDNECK);
    const vneckSubCategory = new SubCategory(SubCategoryType.VNECK);
    const rompersSubCategory = new SubCategory(SubCategoryType.ROMPERS);

    const menCategory = new Category(CategoryType.MEN, [roudneckSubCategory, vneckSubCategory]);
    const womenCategory = new Category(CategoryType.WOMEN, [roudneckSubCategory, vneckSubCategory]);
    const boyCategory = new Category(CategoryType.BOY, [roudneckSubCategory]);
    const girlCategory = new Category(CategoryType.GIRL, [roudneckSubCategory]);
    const infantCategory = new Category(CategoryType.INFANT, [rompersSubCategory]);
    this.categories = [menCategory, womenCategory, boyCategory, girlCategory, infantCategory];
    // this.subCategories = [new SubCategory(SubCategoryType.ROUDNECK), new SubCategory(SubCategoryType.VNECK), new SubCategory(SubCategoryType.ROMPERS)]
  }

  private setupMasterColorVariants() {
    this.masterColorVariants = [
      new ColorVariant(ColorKey.MAROON, 'maroon.png', 'marron'),
      new ColorVariant(ColorKey.PURPLE, 'purple.png', 'purple'),
      new ColorVariant(ColorKey.YELLOW, 'yellow.png', 'yellow'),
      new ColorVariant(ColorKey.RED, 'red.png', 'red'),
      new ColorVariant(ColorKey.SKYBLUE, 'skyblue.png', '#87ceeb'),
      new ColorVariant(ColorKey.BLACK, 'black.png', 'black'),
      new ColorVariant(ColorKey.CHARCOALMELANGE, 'charcoalmelange.png', '#36454f'),
      new ColorVariant(ColorKey.GREEN, 'green.png', 'green'),
      new ColorVariant(ColorKey.GREYMELANGE, 'greymelange.png', '#808080'),
      new ColorVariant(ColorKey.NAVYBLUE, 'navyblue.png', '#000080'),
      new ColorVariant(ColorKey.ROYALBLUE, 'royalblue.png', '#4169e1'),
      new ColorVariant(ColorKey.WHITE, 'white.png', 'white'),
      new ColorVariant(ColorKey.FLAGGREEN, 'flaggreen.png', '#138808'),
      new ColorVariant(ColorKey.GOLDENYELLOW, 'goldenyellow.png', '#FFDF00'),
      new ColorVariant(ColorKey.COFFEEBROWN, 'coffeebrown.png', '#4a2c2a'),
      new ColorVariant(ColorKey.PETROLBLUE, 'petrolblue.png', '#1f2737'),
      new ColorVariant(ColorKey.STEELGREY, 'steelgrey.png', '#7b9095'),
      new ColorVariant(ColorKey.BRICKRED, 'brickred.png', '#cb4154'),
      new ColorVariant(ColorKey.OLIVEGREEN, 'olivegreen.png', '#bab86c')
    ]
  }
}
