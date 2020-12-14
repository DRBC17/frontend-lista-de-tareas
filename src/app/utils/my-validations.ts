import { AbstractControl } from '@angular/forms';

export class MyValidations {
  static isYounger(control: AbstractControl) {
    const value = control.value;
    if (value < 18) return { isYounger: true };

    return null;
  }
}
