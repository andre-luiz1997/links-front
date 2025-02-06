import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { PlansService } from '@shared/services/plans.service';
import { ToastService } from '@shared/services/toast.service';
import { DefaultPaginatedRequest, IPlans } from '@shared/types';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrl: './plans-list.component.scss',
})
export class PlansListComponent {
  plans: IPlans[] = [];
  isLoading = false;
  totalRecords = 0;

  constructor(
    private plansService: PlansService,
    private loaderService: LoaderService,
    private langService: LangService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  toggleStatus(_id: string, value?: boolean) {
    this.plansService.update(_id, { status: value }).subscribe({
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

  toggleDefault(_id: string, value: boolean) {
    this.loaderService.show();
    this.plansService.update(_id, { isDefault: value }).subscribe({
      next: (res) => {
        this.plans.forEach(plan => {
          if(plan._id !== _id) {
            if(value) plan.isDefault = false
          } else {
            plan.isDefault = value;
          }
          return plan;
        });
        this.loaderService.hide();
        this.toastService.show({
          severity: 'success',
          description: this.langService.getMessage('success_messages.record_saved_successfully')
        })
        this.changeDetectorRef.detectChanges();
      },
      error: (res) => {
        this.loaderService.hide();
        this.toastService.show({
          severity: 'error',
          description: this.langService.getMessage('error_messages.error_occurred')
        })
      }
    });
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
    this.plansService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.plans = response.data.records;
          this.totalRecords = response.data.totalRecords ?? 0;
          this.changeDetectorRef.detectChanges();
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  deletePlan(_id: string) {
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.plansService.delete(_id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.plans = this.plans.filter(plan => plan._id !== _id);
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
