import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';
import { Category } from 'src/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(public state: State) { }

  ngOnInit(): void {
  }
  selectCategory(category: Category) {
    this.state.categories.forEach(category => category.__selected = false);
    category.__selected = true;
  }

}
