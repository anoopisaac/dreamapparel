import { Injectable } from '@angular/core';
import { FieldValidator } from 'src/common';
import { isBlank } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;


  constructor() { }

  commonValidation(enclosingObject: any, fieldValidators: FieldValidator[]) {
    // no need to look for full Name if its sign in mode.
    fieldValidators.forEach(fieldValidator => {
      fieldValidator.errMessage = '';
      for (let index = 0; index < fieldValidator.validatorTypes.length; index++) {
        const fieldValidatorType = fieldValidator.validatorTypes[index];
        const fieldValue = enclosingObject[fieldValidator.fieldName];
        if (fieldValidatorType === 'required' && isBlank(fieldValue)) {
          fieldValidator.errMessage = `please enter a valid ${fieldValidator.displayName}`;
          break;
        }
        if (fieldValidatorType === 'email' && !this.isValidEmail(fieldValue)) {
          fieldValidator.errMessage = `please enter a valid email`;
          break;
        }
        if (fieldValidatorType === 'password') {
          if (fieldValue.trim().length < 6 || fieldValue.trim().match(/[0-9]/) === null || fieldValue.trim().match(/\s+/) !== null) {
            fieldValidator.errMessage = 'password must be at least 6 characters long, cannot have spaces and must contain a number';
            break;
          }
        }
      }
    })
  }

  isValidEmail(email: string): boolean {
    return email.match(this.emailRegex) !== null
  }
}
