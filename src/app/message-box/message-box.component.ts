import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '../util.service';
// import { $ } from 'protractor';
import { AngularFireStorage } from '@angular/fire/storage';
import { State } from '../state.service';
import { MessageType, MessageBox } from 'src/common';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnInit {


  constructor(private state: State, private utilService: UtilService, private afStorage: AngularFireStorage) {
    window['mbox'] = this;
  }
  MessageType = MessageType;
  @Input() messageBox: MessageBox;
  ngOnInit() {

  }




  onConfirm() {
    this.state.dialogMessage = undefined;
    this.messageBox.callback(true);
  }
  onCancel(event: any) {
    this.state.dialogMessage = undefined;
    if (this.messageBox.callback !== undefined) {
      this.messageBox.callback(false);
    }
    event.stopPropagation();
  }


}

