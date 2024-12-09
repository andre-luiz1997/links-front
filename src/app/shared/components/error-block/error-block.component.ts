import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { FormControl, FormControlDirective, FormControlName, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, type ControlValueAccessor } from '@angular/forms';
import { LangService } from '@shared/services/lang.service';
import { getErrorMessage } from '@shared/utils/common';
import { debounceTime, startWith } from 'rxjs';

@Component({
  selector: 'app-error-block',
  templateUrl: './error-block.component.html',
  styleUrls: ['./error-block.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ErrorBlockComponent),
      multi: true
    }
  ]
})
export class ErrorBlockComponent implements ControlValueAccessor, OnInit {
  @Input() show = false;

  controlErrors: any[] = [];
	control?: FormControl;
	errorsArray: string[] = [];

  constructor(
    private langService: LangService,
    private injector: Injector
  ) {}

  ngOnInit(): void {
		const ngControl = this.injector.get(NgControl, null, { optional: true });
		if (ngControl instanceof FormControlName) {
			this.control = this.injector
				.get(FormGroupDirective, null, { optional: true })
				?.getControl(this.injector.get(NgControl) as FormControlName);
		} else {
			this.control = (ngControl as FormControlDirective)?.form as FormControl;
		}
		this.control?.valueChanges.pipe(startWith(this.control?.value), debounceTime(100)).subscribe(() => {
			setTimeout(() => {
				const errors = this.control?.errors ?? {};
				if(errors) {
					this.controlErrors = Object.keys(errors)
					// .filter((error) => !this.ignoreErrors?.find((ignored) => error == ignored))
					.map((key) => getErrorMessage(this.langService, key, errors[key]));
				}
			}, 50);
		});
	}

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

}
