import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private $isLoading = new BehaviorSubject<boolean>(false);

  show() {
    this.$isLoading.next(true);
  }

  hide() {
    this.$isLoading.next(false);
  }

  subscribe() {
    return this.$isLoading.asObservable();
  }
}
