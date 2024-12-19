import { Component } from '@angular/core';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LabsService } from '@shared/services/labs.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { DefaultPaginatedRequest, ILabs } from '@shared/types';

@Component({
  selector: 'app-labs-list',
  templateUrl: './labs-list.component.html',
  styleUrls: ['./labs-list.component.scss']
})
export class LabsListComponent {
  labs: ILabs[] = [];
  isLoading = false;
  totalRecords = 0;

  constructor(
    private labsService: LabsService,
    private loaderService: LoaderService,
    private langService: LangService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) { }

  toggleStatus(_id: string, value?: boolean) {

  }

  getAll(event?: any) {
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: event?.skip,
      limit: event?.rows,
      sortBy: event?.multiSortMeta?.at(0)?.field,
      sortOrder: event?.multiSortMeta?.at(0)?.order ?? -1,
      globalFilter: event?.filters?.global?.value
    }
    this.labsService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.labs = response.data.records;
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  deleteLab(_id: string) {
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.labsService.delete(_id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.labs = this.labs.filter(lab => lab._id !== _id);
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
