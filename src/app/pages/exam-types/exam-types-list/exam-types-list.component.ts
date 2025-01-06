import { Component } from '@angular/core';
import type { DefaultPaginatedRequest } from '@shared/types';
import { ExamTypesService } from '@shared/services/exam-types.service';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { LangService } from '@shared/services/lang.service';

@Component({
  selector: 'app-exam-types-list',
  templateUrl: './exam-types-list.component.html',
  styleUrls: ['./exam-types-list.component.scss']
})
export class ExamTypesListComponent {
  $exam_types = this.examTypesService.$examTypes;
  isLoading = false;
  totalRecords = 0;

  constructor(
    private examTypesService: ExamTypesService,
    private confirmationService: ConfirmationService,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private langService: LangService
  ) { }

  getAll(event?: any) {
    this.isLoading = true;
    const props: DefaultPaginatedRequest = {
      skip: event?.first,
      limit: event?.rows,
      sortBy: event?.sortField,
      sortOrder: event?.sortOrder ?? -1,
      globalFilter: event?.filters?.global?.value
    }
    props.filters ??= []
    props.filters.push({
      field: 'parentGroups',
      operator: 'IS NULL OR NOT EXISTS',
    })
    if(props.globalFilter) {
      props.filters.push({
        field: 'name',
        operator: '%%',
        value: props.globalFilter
      })
    }
    this.examTypesService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.$exam_types.next(response.data.records);
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  deleteExamType(_id: string) {
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.examTypesService.delete(_id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.$exam_types.next(this.$exam_types.value.filter(examType => examType._id !== _id));
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
