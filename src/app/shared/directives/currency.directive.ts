import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { formatToCurrency, unformatCurrency } from '@shared/utils/currency';

@Directive({
	selector: '[appCurrency]',
})
export class CurrencyDirective implements OnInit {
	@Input() decimalSeparator = ',';
	@Input() thousandsSeparator = '.';
	decimals = 2;

	private el: any;

	constructor(
		private elementRef: ElementRef,
		private control: NgControl,
	) {
		this.el = this.elementRef.nativeElement;
	}

	ngOnInit(): void {
		if (this.el.value != '' && this.el.value !== undefined && typeof this.el.value === 'number') {
			this.el.value = this.format(this.el.value);
		}
	}

	@HostListener('keyup', ['$event.target.value', '$event'])
	onKeyup(value: any, event: any) {
		if (value != '' && value !== undefined && value !== null && this.el.value != '') {
			let v = this.unformat(this.el.value);
			if (!isNaN(v)) {
				this.el.value = this.format(v);
				this.control.control?.setValue(formatToCurrency(v));
			} else {
				this.el.value = '';
				this.control.control?.setValue('');
			}
		}
	}

	format(value: any) {
		return formatToCurrency(value);
	}

	unformat(value: string) {
		return unformatCurrency(value);
	}
}
