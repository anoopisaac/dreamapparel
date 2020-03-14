import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';
import { Category } from 'src/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public state: State) { }

  selectCategory(category: Category) {
    this.state.selectedCategory = category;
    this.state.selectedSubCategory = this.state.selectedCategory.subCategories[0];
  }
  ngOnInit(): void {
  }

}
