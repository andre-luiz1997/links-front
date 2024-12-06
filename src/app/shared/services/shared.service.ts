import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  $signedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  $role: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  clear() {
    this.$signedUser.next(null);
  }
}
