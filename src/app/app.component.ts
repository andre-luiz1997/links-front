import { Component, ViewChild } from '@angular/core';
import { ConfirmationDialogComponent } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationService } from '@shared/services/confirmation.service';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  isLoading = false;

  @ViewChild('confirmationDialog') confirmationDialog?: ConfirmationDialogComponent;

  constructor(
    private loaderService: LoaderService,
    private toastService: ToastService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.loaderService.subscribe().subscribe(isLoading => {
      this.isLoading = isLoading;
    });

    this.toastService.$toast.subscribe(toast => {
      if(!toast) return;
      this.messageService.add({
        severity: toast.severity,
        summary: toast.title,
        detail: toast.description,
        closable: true,
      })
    });

    this.confirmationService.$confirmationDialogProps.subscribe(confirmationDialogProps => {
      if(confirmationDialogProps) {
        this.confirmationDialog?.show(confirmationDialogProps);
      } else {
        this.confirmationDialog?.hide();
      }
    });
  }
}
