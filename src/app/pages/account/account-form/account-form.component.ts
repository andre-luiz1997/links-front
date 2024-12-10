import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '@shared/validators';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '@shared/services/user.service';
import { UpdateUserDTO } from '@shared/types';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { LangService } from '@shared/services/lang.service';

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
  })

  isSubmitted = false

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private langService: LangService
  ) {
    this.setForm();
  }

  setForm() {
    const user = this.authService.$signedUser.getValue();
    if(user) this.form.patchValue(user);
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.form.invalid) return;
    const id = this.form.value._id;
    if (!id) return;
    this.loaderService.show();
    const dto: UpdateUserDTO = {
      email: this.form.value.email!,
      name: this.form.value.name!
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
