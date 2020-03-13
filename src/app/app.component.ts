import { Component, OnInit } from '@angular/core';
import { State } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dream-apparel';
  constructor(private state: State) {

  }
  ngOnInit(): void {
    window['state'] = this.state;
  }
}
