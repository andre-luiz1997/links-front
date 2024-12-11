import { Injectable } from '@angular/core';
import type { IConfirmationDialogProps } from '@shared/components/confirmation-dialog/confirmation-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  $confirmationDialogProps = new BehaviorSubject<IConfirmationDialogProps | null>(null);
  
  show(props: IConfirmationDialogProps) {
    this.$confirmationDialogProps.next(props);
  }

  hide() {
    this.$confirmationDialogProps.next(null);
  }
}
