import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isEmailValid, isEmpty } from '../utils/common';

export function IsValidEmailValidator(control: AbstractControl): ValidationErrors | null {
	if (!control.value || isEmpty(control.value) || isEmailValid(control.value)) return null;
	return {
		email: {
			email: true,
		},
	};
}
