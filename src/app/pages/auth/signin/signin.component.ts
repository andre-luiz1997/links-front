import { Component, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '@shared/services/loader.service';
import { AuthService } from '../services/auth.service';
import { ToastService } from '@shared/services/toast.service';
import { LangService } from '@shared/services/lang.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
	form = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});
	isSubmitted = false;

	constructor(
		private loaderService: LoaderService,
		private authService: AuthService,
		private toastService: ToastService,
		private langService: LangService,
		private router: Router,
		private renderer: Renderer2
	) { }

	@HostListener('document:keypress', ['$event'])
	onEnter(event: KeyboardEvent) {
		if (event.key === 'Enter') this.submitForm();
	}

	submitForm() {
		this.isSubmitted = true;
		this.form.updateValueAndValidity();

		if (this.form.invalid) return;
		this.loaderService.show();
		this.authService
			.signin({
				email: this.form.get('email')?.value!,
				password: this.form.get('password')?.value!,
			})
			.then(res => {
				this.router.navigate(['/']);
				setTimeout(() => {
					this.loaderService.hide();
				}, 3000);
			})
			.catch(res => {
				const message =
					this.langService.getMessage(`error_messages.${res.error?.message}`) ??
					this.langService.getMessage('error_messages.error_occurred');
				this.loaderService.hide();
				this.toastService.show({
					severity: 'error',
					description: message,
				});
			});
	}
}
