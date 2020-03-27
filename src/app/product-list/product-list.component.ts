import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';
import { Category, SubCategory, Product, ProductSku, ProductDesign, ColorKey, DesignImage } from 'src/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public state: State) { }


  ngOnInit(): void {
    this.state.selectedCategory = this.state.categories[0];
    this.state.selectedSubCategory = this.state.selectedCategory.subCategories[0];
  }

  selectSubCategory(subCategory: SubCategory) {
    this.state.selectedSubCategory = subCategory;
  }


  onMouseover(prodDesign: ProductDesign) {
    prodDesign.__isMouseOver = true;
  }
  onMouseleave(prodDesign: ProductDesign) {
    prodDesign.__isMouseOver = false;
  }

  /**
   * invoked form template to get product images specific for color
   * @param product 
   * @param colorKey 
   */
  getProductImgUrl(product: Product, colorKey?: ColorKey): string {
    colorKey = colorKey === undefined ? product.colorKeys[0] : colorKey;
    const colorVariant = this.state.masterColorVariants.find(it => it.colorKey === colorKey)
    // return `/assets/product-images/${product.prodImgFolderName}/${colorVariant.imgFileName}`
    return `/assets/product-images/${product.prodImgFolderName}/red6.png`
    return `/assets/product-images/${product.prodImgFolderName}/${colorVariant.imgFileName}`
  }

  /**
   * invoked from the template to get image url for specific design
   * @param prodDesign 
   */
  getDesignImgUrl(prodDesign: ProductDesign): string {
    // first get the image design
    const designImage: DesignImage = this.state.getDesignsById(prodDesign.designId);
    return `/assets/designs/${designImage.folderName}/${designImage.imageName}`
  }

  getImgWidth(prodDesign: ProductDesign){
    return prodDesign.width;
  }


}
