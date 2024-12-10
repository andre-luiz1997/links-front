import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { RoleService } from '@shared/services/role.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements AfterViewInit {

  form = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
    isDefault: new FormControl(false),
    permissions: new FormControl([]),
  })
  isSubmitted = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private toastService: ToastService,
    private langService: LangService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.params?.['roleId'];
    if (id) this.fetchRole(id);
  }

  fetchRole(id: string) {
    this.loaderService.show();
    this.roleService.getOne(id).subscribe({
      next: (res) => {
        this.loaderService.hide();
        if (res.data) {
          this.form.patchValue({
            _id: res.data._id,
            name: res.data.name,
            isDefault: res.data.isDefault,
          });
        }
      },
      error: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage('error_messages.error_occurred')
        });
      }
    })
  }

  submitForm() {
    this.isSubmitted = true;
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    const data = this.form.getRawValue();
    this.loaderService.show();
    this.roleService.save(data).subscribe({
      next: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        });
        this.router.navigate(['/roles']);
      },
      error: (err) => {
        const description = this.langService.getMessage(err?.error?.message) ?? this.langService.getMessage('error_messages.error_occurred');
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description
        });
      }
    })
  }
}
