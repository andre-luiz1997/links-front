import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ReferenceValuesService } from '@shared/services/reference-values.service';
import { ToastService } from '@shared/services/toast.service';
import type { DefaultPaginatedRequest, IReferenceValues } from '@shared/types';
import { getReferenceValuesAgeRange, getReferenceValuesString } from '@shared/utils/referenceValues';

@Component({
  selector: 'app-reference-values-list',
  templateUrl: './reference-values-list.component.html',
  styleUrls: ['./reference-values-list.component.scss']
})
export class ReferenceValuesListComponent {
  isLoading = false;
  totalRecords = 0;
  referenceValues: IReferenceValues[] = []
  examTypeId?: string;

  getReferenceValuesString = getReferenceValuesString
  getReferenceValuesAgeRange = getReferenceValuesAgeRange

  constructor(
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    protected langService: LangService,
    private referenceValuesService: ReferenceValuesService
  ) {
    this.examTypeId = this.activatedRoute.snapshot.params['examTypeId'];

  }

  getAll(event?: any) {
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: event?.first,
      limit: event?.rows,
      sortBy: event?.multiSortMeta?.at(0)?.field,
      sortOrder: event?.multiSortMeta?.at(0)?.order ?? -1,
      globalFilter: event?.filters?.global?.value,
      filters: []
    }
    if (this.examTypeId) {
      props.filters?.push({ field: 'examType', operator: 'LIKE_ID', value: this.examTypeId });
    }
    this.referenceValuesService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.referenceValues = response.data.records;
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  deleteReferenceValue(_id: string) {
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.referenceValuesService.delete(_id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.referenceValues = this.referenceValues.filter(referenceValue => referenceValue._id !== _id);
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
