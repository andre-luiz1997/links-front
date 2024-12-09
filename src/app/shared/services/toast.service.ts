import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

export interface ToastProps {
  severity: 'success' | 'info' | 'warn' | 'error';
  title?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  $toast = new BehaviorSubject<ToastProps | null>(null);

  show(props: ToastProps) {
    this.$toast.next(props);
  }
}
