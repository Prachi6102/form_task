import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ageValidator(
  control: AbstractControl
): ValidationErrors | null {
  const dob = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();

  if (age < 18) {
    return { underage: true };
  }

  return null;
}
