import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";


@Directive({
  selector: '[appPasswordsConfirmationValidator]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordsConfirmationValidatorDirective), multi: true }]
})
export class PasswordsConfirmationValidatorDirective implements Validator {

  private valFn;

  constructor() {
    this.valFn = this.validatePassword();
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.valFn(c);
  }

  private validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      let isValid = false;
      if (control && control instanceof FormGroup) {
        let group = control as FormGroup;
        if (group.controls['pass'] && group.controls['verificationPassword']) {
          isValid = group.controls['pass'].value == group.controls['verificationPassword'].value;
        }
      }
      if (isValid) {
        return null;
      } else {
        return { 'passwordCheck': 'failed' }
      }
    }
  }

}
