import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';
import { Category, SubCategory, Product, ProductSku, ProductDesign } from 'src/common';

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


}
