import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '@shared/services/shared.service';
import { DefaultResponse, SigninDTO, SigninResponse } from '@shared/types';
import { STORAGE } from '@shared/utils/storage';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private endpoint = `${environment.SERVER_URL}/auth`;
	$signedUser = this.sharedService.$signedUser;
	$role = this.sharedService.$role;

	constructor(
		private httpClient: HttpClient,
		private sharedService: SharedService,
	) {
		this.$signedUser.next(this.loadSignedUser());
		this.$role.next(this.loadRole());
	}

	private loadSignedUser() {
		return STORAGE.get(STORAGE.keys.USER);
	}

	private loadRole() {
		return STORAGE.get(STORAGE.keys.ROLE);
	}

	async signin(signinDTO: SigninDTO) {
		try {
			const response = await lastValueFrom(this.httpClient.post<DefaultResponse<SigninResponse>>(this.endpoint, signinDTO, { withCredentials: true }));
      if(response?.data?.access_token) {
        STORAGE.set(STORAGE.keys.ACCESS_TOKEN, response.data.access_token);
        STORAGE.set(STORAGE.keys.USER, response.data.user);
        STORAGE.set(STORAGE.keys.ROLE, response.data.role);
        this.$signedUser.next(response.data.user);
        this.$role.next(response.data.role);
      }
		} catch (error) {
			throw error;
		}
	}

  hasAccessToken() {
    return !!STORAGE.get(STORAGE.keys.ACCESS_TOKEN);
  }

  getBaseUrl() {
    return ['/'];
  }
}
