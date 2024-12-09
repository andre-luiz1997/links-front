import { Component, type OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '@shared/services/loader.service';
import { SignupDTO } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
import { CustomValidators } from '@shared/validators';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(3)]),
		email: new FormControl('', [Validators.required, CustomValidators.IsValidEmailValidator]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	isSubmitted = false;

	constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

	ngOnInit(): void {
		this.form.get('password')?.valueChanges.subscribe(password => {
			this.checkPasswordsMatch();
		});
		this.form.get('passwordConfirm')?.valueChanges.subscribe(password => {
			this.checkPasswordsMatch();
		});
	}

	private checkPasswordsMatch() {
		const passwordControl = this.form.get('password');
		const passwordConfirmControl = this.form.get('passwordConfirm');
		if (isEmpty(passwordControl?.value) || isEmpty(passwordConfirmControl?.value)) return;
		if (passwordControl?.value !== passwordConfirmControl?.value) {
			passwordConfirmControl?.setErrors({ passwords_must_match: true }, { emitEvent: false });
		} else {
			passwordConfirmControl?.setErrors(null, { emitEvent: false });
		}
	}

	submitForm() {
		this.isSubmitted = true;
		this.form.updateValueAndValidity();

		if (this.form.invalid) return;
		const dto: SignupDTO = {
			name: this.form.get('name')?.value!,
			email: this.form.get('email')?.value!,
			password: this.form.get('password')?.value!,
		};
		this.loaderService.show();
    this.authService.signup(dto).subscribe({
      next: (res) => {
        this.loaderService.hide();
      },
      error: (res) => {
        this.loaderService.hide();
      }
    });
	}
}
