import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';
import { Category, SubCategory, Product, ProductSku } from 'src/common';

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


  onMouseover(product: Product) {
    product. = true;
  }
  onMouseleave(product: Product) {
    product.__isMouseover = false;
  }


  getProductSkuList(): ProductSku[] {
    
  }

}
