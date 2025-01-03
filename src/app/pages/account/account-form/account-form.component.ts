import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@shared/validators';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { UpdateUserDTO } from '@shared/types';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { LangService } from '@shared/services/lang.service';
import { CALENDAR_DATE_FORMAT_BR, DATE_MASK_BR } from '@shared/utils/constants';
import { PrimeNG } from 'primeng/config';
import dayjs from 'dayjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent {
  form = new FormGroup({
    _id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, CustomValidators.IsValidEmailValidator]),
    birthDate: new FormControl<Date | undefined>(undefined),
  })

  isSubmitted = false
  today = new Date()
  dateFormat = CALENDAR_DATE_FORMAT_BR
  DATE_MASK_BR = DATE_MASK_BR

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private langService: LangService,
    private primeNGConfig: PrimeNG,
  ) {
    this.setForm();
    this.primeNGConfig.setTranslation(this.langService.getTranslation().calendar_inputs);

  }

  setForm() {
    const user = this.authService.$signedUser.getValue();
    console.log("🚀 ~ AccountFormComponent ~ setForm ~ user:", user)
    if(user) this.form.patchValue({...user, birthDate: dayjs(user.birthDate).toDate()});
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const id = this.form.value._id;
    if (!id) return;
    this.loaderService.show();
    const dto: UpdateUserDTO = {
      email: this.form.value.email!,
      name: this.form.value.name!,
      birthDate: this.form.value.birthDate!,
    };
    this.userService.update(id, dto)
      .then((res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully'),
        });
        this.authService.updateSignedUser(res.data);
      })
      .catch((error) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage(`error_messages.${error?.error?.message}`) || this.langService.getMessage('error_messages.error_occurred'),
        });
      });
  }
}
