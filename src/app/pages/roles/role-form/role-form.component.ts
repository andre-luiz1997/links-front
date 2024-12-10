import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { RoleService } from '@shared/services/role.service';
import { ToastService } from '@shared/services/toast.service';
import { IPermissions, IRoles } from '@shared/types';

interface IRolePermissions {
  context: string;
  isChecked: boolean;
  permissions: { name: string, isChecked: boolean }[];
}

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
  })
  role?: IRoles;
  isSubmitted = false;
  permissions: IPermissions[] = [];
  rolePermissions: IRolePermissions[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private toastService: ToastService,
    private langService: LangService,
    private loaderService: LoaderService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.params?.['roleId'];
    const promises = [];
    if (id) promises.push(this.fetchRole(id));
    promises.push(this.fetchPermissions());
    Promise.all(promises).then(() => {
      this.mapRolePermissions();
    });
  }

  checkContextPermissions(contextIndex: number) {
    const context = this.rolePermissions[contextIndex];
    context.permissions.forEach(p => {p.isChecked = context.isChecked});
  }

  checkContext(contextIndex: number) {
    const context = this.rolePermissions[contextIndex];
    if(context.permissions.every(p => p.isChecked)) {
      context.isChecked = true;
    } else {
      context.isChecked = false;
    }
  }

  private mapRolePermissions() {
    this.rolePermissions = this.permissions.map(permission => {
      const rolePermission = this.role?.permissions?.find(p => p.context === permission.context);
      // isChecked if has all available permissions
      let isChecked = rolePermission !== undefined;

      const permissions = permission.permissions.map(p => {
        const roleP = rolePermission?.permissions?.find(rp => rp === p);
        if(!roleP) isChecked = false;
        return {
          name: p,
          isChecked: roleP !== undefined
        }
      });

      return {
        context: permission.context,
        isChecked,
        permissions
      }
    });
    this.changeDetector.detectChanges();
  }

  fetchPermissions() {
    return new Promise<void>((resolve, reject) => {
      this.roleService.getPermissions().subscribe({
        next: (res) => {
          if (res.data) {
            this.permissions = res.data;
          }
          resolve();
        },
        error: (res) => {
          this.toastService.show({
            severity: 'error',
            description: this.langService.getMessage('error_messages.error_occurred')
          });
          reject();
        }
      })
    });
  }

  fetchRole(id: string) {
    return new Promise<void>((resolve, reject) => {
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
            this.role = res.data;
          }
          resolve();
        },
        error: (res) => {
          this.loaderService.hide();
          this.toastService.show({
            severity: 'error',
            description: this.langService.getMessage('error_messages.error_occurred')
          });
          reject();
        }
      })
    });
  }

  submitForm() {
    this.isSubmitted = true;
    this.form.updateValueAndValidity();
    if (!this.form.valid) return;
    const data = this.form.getRawValue();
    this.loaderService.show();
    const permissions = this.rolePermissions.filter(c => c.isChecked || c.permissions.some(p => p.isChecked)).map(c => {
      return {
        context: c.context,
        permissions: c.permissions.filter(p => p.isChecked).map(p => p.name)
      }
    });
    this.roleService.save({...data, permissions}).subscribe({
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
