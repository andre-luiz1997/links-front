import { Component, forwardRef, Input } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validator,
} from '@angular/forms';

@Component({
	selector: 'app-input-password',
	templateUrl: './input-password.component.html',
	styleUrls: ['./input-password.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputPasswordComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: forwardRef(() => InputPasswordComponent),
		},
	],
})
export class InputPasswordComponent implements ControlValueAccessor, Validator {
	@Input() isSubmitted = false;

	isShown = false;
	type: 'password' | 'text' = 'password';
	icon: 'phosphorEye' | 'phosphorEyeSlash' = 'phosphorEye';

	onChange: any = () => {};
	onTouched: any = () => {};
  onValidatorChange: any = () => {};

	passwordForm = new FormGroup({
		password: new FormControl(null),
	});

	protected toggle() {
		this.isShown = !this.isShown;
		this.type = this.isShown ? 'text' : 'password';
		this.icon = this.isShown ? 'phosphorEyeSlash' : 'phosphorEye';
	}

	writeValue(obj: any): void {
		this.passwordForm.reset({ password: obj });
	}
	registerOnChange(fn: any): void {
		this.onChange = fn;
		this.passwordForm.get('password')?.valueChanges.subscribe(fn);
	}
	registerOnTouched(fn: any): void {
		this.onTouched = fn;
		this.passwordForm.get('password')?.valueChanges.subscribe(fn);
	}
	setDisabledState?(isDisabled: boolean): void {
		if (isDisabled) {
			this.passwordForm.get('passwordControl')?.disable();
		} else {
			this.passwordForm.get('passwordControl')?.enable();
		}
	}
	validate(control: AbstractControl): ValidationErrors | null {
		return this.passwordForm.valid ? null : this.passwordForm.errors;
	}
	registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }
  updateValidators() {
    if (this.onValidatorChange) {
      this.onValidatorChange(); // Atualiza as validações registradas
    }
  }
}
