import { Component } from '@angular/core';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { ExamsService } from '@shared/services/exams.service';
import { LangService } from '@shared/services/lang.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import type { DefaultPaginatedRequest, IExams } from '@shared/types';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.scss']
})
export class ExamsListComponent {
  isLoading = false;
  totalRecords = 0;
  exams: IExams[] = [];

  constructor(
    private examsService: ExamsService,
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
    this.examsService.getAll(props).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data) {
          this.exams = response.data.records;
          this.totalRecords = response.data.totalRecords ?? 0;
        }
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  deleteExam(_id: string) {
    this.confirmationService.show({
      title: 'delete_confirmation.title',
      description: 'delete_confirmation.description',
      confirmButton: {
        label: 'continue',
        severity: 'danger',
        action: () => {
          this.loaderService.show();
          this.examsService.delete(_id).subscribe({
            next: (response) => {
              this.confirmationService.hide();
              this.exams = this.exams.filter((item) => item._id !== _id);
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
