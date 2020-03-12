import { Component, OnInit } from '@angular/core';
import { FieldValidator, ContactUsForm, MessageBox, MessageType } from 'src/common';
import { ValidationService } from '../validation.service';
import { isNotBlank } from '../util.service';
import { State } from '../state.service';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(private validationService: ValidationService, public state: State, private fireService: FireService) { }

  ngOnInit(): void {
    this.populateContactUsValidarors();
  }

  closeContactUs() {
    this.state.contactForm = undefined;
  }
  submitContactForm() {

    if (!this.doValidation()) {
      return;
    }
    this.fireService.insertContactUs(this.state.contactForm);
    this.state.contactForm = undefined;
    this.state.dialogMessage = new MessageBox(`Thank you for reaching out to us. Please allow us some time before we get in touch with
    you.`, () => {

      }, MessageType.INFO);
  }

  fieldValidators: FieldValidator[] = [];
  populateContactUsValidarors() {

    const firstNameValidator = new FieldValidator('fName', 'First Name', ['required']);
    const emailValidator = new FieldValidator('email', 'Email', ['required', 'email']);
    const contentValidator = new FieldValidator('content', 'Message', ['required']);
    this.fieldValidators = [firstNameValidator, emailValidator, contentValidator];
  }

  doValidation(): boolean {
    // settign all the previous validation to nil
    this.fieldValidators.forEach(it => it.errMessage = '');
    // no need to look for full Name if its sign in mode.
    this.validationService.commonValidation(this.state.contactForm, this.fieldValidators);
    return this.fieldValidators.filter(item => isNotBlank(item.errMessage)).length === 0
  }
  getErrorMessage(fieldName: string) {
    const validator = this.fieldValidators.find(item => item.fieldName === fieldName);
    return validator.errMessage === '' ? undefined : validator.errMessage;
  }

}
