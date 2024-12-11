import { Component, Input } from '@angular/core';

export type ConfirmButtonSeverity = 'primary' | 'danger' | 'default';

export interface IConfirmationDialogProps {
  title?: string;
  description: string;
  confirmButton: {
    label?: string;
    action: () => void;
    severity?: ConfirmButtonSeverity;
  },
  cancelButton: {
    label?: string;
    action: () => void;
  }
}


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  isShown = false;
  title?: string;
  description?: string;
  confirmButton?: {
    label?: string;
    action: () => void;
    severity?: ConfirmButtonSeverity;
  }
  cancelButton?: {
    label?: string;
    action: () => void;
  }
  confirmButtonClass?: string;

  show(props: IConfirmationDialogProps) {
    this.isShown = true;
    this.title = props.title;
    this.description = props.description;
    this.confirmButton = props.confirmButton;
    this.cancelButton = props.cancelButton;
    this.confirmButtonClass = this.confirmButton?.severity ? `btn-${this.confirmButton.severity}` : 'btn-primary';
  }

  hide() {
    this.isShown = false;
  }
}
