import { Component, OnInit } from '@angular/core';
import { State } from '../state.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(public state: State) { }

  compId: string;
  ngOnInit() {
    this.state.components.push(this);
  }
  ngOnDestroy(): void {
    this.state.components = this.state.components.filter(comp => comp !== this);
  }
}
