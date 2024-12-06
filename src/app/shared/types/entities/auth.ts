import type { IRoles } from "./role";
import type { IUsers } from "./user";

export interface SigninDTO {
	email: string;
	password: string;
}

export interface SigninResponse {
    user: IUsers;
    role: IRoles;
    access_token: string;
}