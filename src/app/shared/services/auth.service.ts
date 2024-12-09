import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '@shared/services/shared.service';
import { DefaultResponse, IUsers, SigninDTO, SigninResponse, SignupDTO, UpdateUserDTO } from '@shared/types';
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
		private router: Router,
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

	updateSignedUser(dto: IUsers) {
		const user = this.$signedUser.getValue();
		this.$signedUser.next({ ...user, ...dto });
		STORAGE.set(STORAGE.keys.USER, this.$signedUser.getValue());
	}

	async signout() {
		STORAGE.clear();
		this.sharedService.clear();
		this.httpClient.get(`${environment.SERVER_URL}/auth/signout`, { withCredentials: true }).subscribe();
		return this.router.navigate(['/auth/signin']);
	}

	async signup(signupDTO: SignupDTO) {
		try {
			const response = await lastValueFrom(
				this.httpClient.post<DefaultResponse<SigninResponse>>(`${this.endpoint}/signup`, signupDTO, { withCredentials: true }),
			);
			if (response?.data?.access_token) {
				STORAGE.set(STORAGE.keys.ACCESS_TOKEN, response.data.access_token);
				STORAGE.set(STORAGE.keys.USER, response.data.user);
				STORAGE.set(STORAGE.keys.ROLE, response.data.user?.role);
				this.$signedUser.next(response.data.user);
				this.$role.next(response.data.user?.role);
			}
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async signin(signinDTO: SigninDTO) {
		try {
			const response = await lastValueFrom(
				this.httpClient.post<DefaultResponse<SigninResponse>>(this.endpoint, signinDTO, { withCredentials: true }),
			);
			if (response?.data?.access_token) {
				STORAGE.set(STORAGE.keys.ACCESS_TOKEN, response.data.access_token);
				STORAGE.set(STORAGE.keys.USER, response.data.user);
				STORAGE.set(STORAGE.keys.ROLE, response.data.user?.role);
				this.$signedUser.next(response.data.user);
				this.$role.next(response.data.user?.role);
			}
			return response.data;
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
