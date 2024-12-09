import { Injectable } from '@angular/core';
import { STORAGE } from '@shared/utils/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  $toggled = new BehaviorSubject<boolean>(STORAGE.get(STORAGE.keys.TOGGLE_SIDEBAR));
}
