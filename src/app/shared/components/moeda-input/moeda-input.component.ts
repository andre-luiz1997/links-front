import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, forwardRef } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	NG_VALIDATORS,
	NG_VALUE_ACCESSOR,
	ValidationErrors,
	Validator,
} from '@angular/forms';
import { float2moeda, moeda2float } from '@shared/utils/currency';

@Component({
	selector: 'app-moeda-input',
	templateUrl: './moeda-input.component.html',
	styleUrls: ['./moeda-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => MoedaInputComponent),
		},
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: forwardRef(() => MoedaInputComponent),
		},
	],
})
export class MoedaInputComponent implements AfterViewInit, ControlValueAccessor, Validator {
	@Input('enabled') enabled = true;
	@Input('percent') percent = false;
	@ViewChild('input') input!: any;
	formControl = new FormControl('');

	constructor(
		private detector: ChangeDetectorRef,
	) {}

	value: null | number = null;

	ngAfterViewInit(): void {
		if (!this.value && this.value !== 0) {
			this.formControl.setValue('');
		} else {
			this.formControl.setValue(float2moeda(this.value));
		}
		this.changeText();
	}

	changeText() {
		let value = this.input.nativeElement.value;
		if (value) {
			let parsedValue = moeda2float(value);
			if (this.percent) {
				if (parsedValue > 99.99) {
					this.input.nativeElement.value = '100,00';
					parsedValue = 100;
				} else if (parsedValue < 0) {
					this.input.nativeElement.value = '0,00';
					parsedValue = 0;
				}
			}
			if (isNaN(parsedValue)) parsedValue = 0;
			this.formControl.setValue(float2moeda(parsedValue), { emitEvent: false });
			this.onChange(parsedValue);
			this.markAsTouched();
		} else {
			this.onChange(null);
		}
	}

	registerOnChange = (onChange: any) => (this.onChange = onChange);
	onChange = (newValue: number | null) => {};

	registerOnTouched = (onTouched: any) => (this.onTouched = onTouched);
	onTouched = () => {};

	writeValue(value: number) {
		this.value = value;
		if (!this.input?.nativeElement) return;
		if (!value && value !== 0) {
			this.formControl.setValue('');
		} else {
			this.formControl.setValue(float2moeda(value));
		}
		this.detector.detectChanges();
	}

	touched = false;
	markAsTouched() {
		if (!this.touched) {
			this.onTouched();
			this.touched = true;
		}
	}

	disabled = false;
	setDisabledState(disabled: boolean) {
		if (this.disabled == disabled) return;
		this.disabled = disabled;
		if (this.disabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}

	validate(control: AbstractControl<any, any>): ValidationErrors | null {
		let errors: any = {};
		return null;
	}
}
