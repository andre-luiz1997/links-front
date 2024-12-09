import { Component } from '@angular/core';
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

  constructor(
    private loaderService: LoaderService,
    private toastService: ToastService,
    private messageService: MessageService,
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
  }
}
