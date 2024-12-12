import { AfterViewInit, Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import countries from '../../../../assets/data/countries.json';
import statesCities from '../../../../assets/data/bra-states-cities.json';
import { ZIPCODE_MASK } from '@shared/utils/constants';
import { ZipcodeService } from '@shared/services/zipcode.service';
import { IAddress } from '@shared/types';
import { LoaderService } from '@shared/services/loader.service';
import { isEmpty } from '@shared/utils/common';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => AddressFormComponent),
    },
  ],
})
export class AddressFormComponent implements OnChanges, AfterViewInit, ControlValueAccessor, Validator {

  @Input() isSubmitted = false;
  @Input() requiredFields?: string[] = ['country', 'zipCode', 'street', 'city', 'state', 'neighborhood']

  form = new FormGroup({
    street: new FormControl<string | undefined>(undefined),
    city: new FormControl<string | undefined>(undefined),
    state: new FormControl<string | undefined>(undefined),
    zipCode: new FormControl<string | undefined>(undefined),
    number: new FormControl<string | undefined>(undefined),
    complement: new FormControl<string | undefined>(undefined),
    neighborhood: new FormControl<string | undefined>(undefined),
    country: new FormControl<string | undefined>(undefined),
  })

  isBRA = false
  zipCodeMask: string | undefined;

  countries = countries
  cities: string[] = []
  states = statesCities.map((state) => ({ name: state.nome, code: state.sigla }))

  onChange: any = () => { };
  onTouched: any = () => { };
  onValidatorChange: any = () => { };

  constructor(
    private zipcodeService: ZipcodeService,
    private loaderService: LoaderService
  ) {
    this.configureForRequiredFields();
  }

  private configureForRequiredFields() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (this.requiredFields?.includes(key) && !control?.hasValidator(Validators.required)) {
        control?.setValidators(Validators.required)
      } else {
        control?.clearValidators()
      }
      control?.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requiredFields']) {
      this.configureForRequiredFields();
    }
  }

  ngAfterViewInit(): void {
    this.form.get('country')?.valueChanges.subscribe((country) => {
      this.isBRA = country === 'BRA'
      if (!this.isBRA) this.zipCodeMask = undefined
      else this.zipCodeMask = ZIPCODE_MASK
    });

    this.form.get('state')?.valueChanges.subscribe((country) => {
      if (this.isBRA) {
        this.cities = statesCities.find((state) => state.sigla === country)?.cidades?.map(c => c.nome) || []
      }
    });

    this.form.get('zipCode')?.valueChanges.subscribe((zipCode) => {
      const zipcodeWithoutMask = zipCode?.replace(/[^0-9]/g, '');
      if (this.isBRA && zipcodeWithoutMask && zipcodeWithoutMask?.length === this.zipCodeMask?.replace(/[^0-9]/g, '')?.length) {
        this.loaderService.show()
        this.zipcodeService.get(zipcodeWithoutMask).subscribe({
          next: (res) => {
            this.loaderService.hide()
            if (res.data) {
              this.form.get('street')?.setValue(res.data.street)
              this.form.get('city')?.setValue(res.data.city)
              this.form.get('state')?.setValue(res.data.state)
              this.form.get('neighborhood')?.setValue(res.data.neighborhood)
            }
          },
          error: (err) => {
            this.loaderService.hide()
          }
        })
      }
    })

    this.form.get("country")?.setValue("BRA");
  }

  writeValue(obj: any): void {
    this.form.reset(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.form.valueChanges.subscribe(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return this.form.valid ? null : this.form.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

}
