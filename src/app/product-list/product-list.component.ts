import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';
import { Category, SubCategory } from 'src/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public state: State) { }

  selectedCategory: Category;
  selectedSubCategory: SubCategory;
  ngOnInit(): void {
    this.selectedCategory = this.state.categories[0];
    this.selectedSubCategory = this.selectedCategory.subCategories[0];
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.selectedSubCategory = this.selectedCategory.subCategories[0];
  }

  selectSubCategory(subCategory: SubCategory) {
    this.selectedSubCategory = subCategory;
  }

}
