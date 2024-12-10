import { Injectable } from '@angular/core';
import { IRoles, IUsers } from '@shared/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  $signedUser = new BehaviorSubject<IUsers | null>(null);
  $role = new BehaviorSubject<IRoles | null>(null);

  clear() {
    this.$signedUser.next(null);
  }

  hasPermission(context: string, permission: string) {
    const permissions = this.$role.value?.permissions ?? [];
    if(!permissions.length) return false;
    return permissions.some(p => p.context === context && p.permissions.includes(permission));
  }

  hasPermissionInContext(context: string) {
    const permissions = this.$role.value?.permissions ?? [];
    if(!permissions.length) return false;
    return permissions.some(p => p.context === context);
  }
}
