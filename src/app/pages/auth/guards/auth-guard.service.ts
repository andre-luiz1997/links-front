import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuardService {
	private url?: string;

	constructor(
		private router: Router,
		private authService: AuthService,
	) {}

	async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.url = state.url;
		return this.checkLogin(next);
	}

	private redirect() {
		const redirectUrl = this.url ? encodeURIComponent(this.url) : null;
		if (redirectUrl) {
			return this.router.navigate(['/auth/signin'], { queryParams: { redirectUrl } });
		}
		return this.router.navigate(['/auth/signin']);
	}

  private redirectForbidden() {
    return this.router.navigate(['/auth/forbidden']);
  }

  private redirectHome() {
    return this.router.navigate(this.authService.getBaseUrl());
  }

	async checkLogin(route: ActivatedRouteSnapshot) {
		if(!this.authService.hasAccessToken()) {
      this.redirect();
      return false;
    }
    const role = this.authService.$role.getValue();
    if(route.data?.['permission']) {
      if(role?.permissions) {
        let valid = false;
        route.data['permission'].map((permission: string) => {
          const find = role.permissions.find((p: string) => p === permission);
          if(find) valid = true;
        });
        if(!valid) {
          this.redirectForbidden();
          return false;
        }
      } else {
        this.redirectForbidden();
        return false;
      }
    } else if (route.data?.['role']) {
      if(role?.name != route.data['role']) {
        this.redirectHome();
        return false;
      }
    }
    return true;
	}
}
