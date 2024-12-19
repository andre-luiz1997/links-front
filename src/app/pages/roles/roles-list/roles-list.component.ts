import { Component } from '@angular/core';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { RoleService } from '@shared/services/role.service';
import { ToastService } from '@shared/services/toast.service';
import { DefaultPaginatedRequest, IRoles } from '@shared/types';
import { isEmpty } from '@shared/utils/common';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent {
  roles: IRoles[] = [];
  isLoading = false;
  totalRecords = 0;

  constructor(
    private roleService: RoleService,
    private toastService: ToastService,
    private langService: LangService,
    private confirmationService: ConfirmationService,
    private loaderService: LoaderService,
  ) { }

  getAll(event?: any) {
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: event?.skip,
      limit: event?.rows,
      sortBy: event?.multiSortMeta?.at(0)?.field,
      sortOrder: event?.multiSortMeta?.at(0)?.order ?? -1,
      globalFilter: event?.filters?.global?.value
    }
    this.roleService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.roles = response.data.records;
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  toggleDefaultRole(_id: string, _isDefault?: boolean) {
    let isDefault = this.roles.find(role => role._id === _id)?.isDefault;
    if(!isEmpty(isDefault)) isDefault = _isDefault;
    else isDefault = !isDefault;
    this.roleService.update(_id, { isDefault }).subscribe({
      next: (res) => {
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        })
      }, 
      error: (res) => {
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage('error_messages.error_occurred')
        })
      }
    });
  }

  deleteRole(_id: string) {
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.roleService.delete(_id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.roles = this.roles.filter(role => role._id !== _id);
              this.totalRecords--;
              this.loaderService.hide();
              this.toastService.show({
                description: this.langService.getMessage('success_messages.record_deleted_successfully'),
                severity: 'success'
              });
            },
            error: () => {
              this.loaderService.hide();
              this.toastService.show({
                description: this.langService.getMessage('error_messages.error_occurred'),
                severity: 'error'
              });
            }
          });
        }
      },
      cancelButton: {
        label: 'cancel',
        action: () => {
          this.confirmationService.hide();
        }
      }
    });
  }
}
