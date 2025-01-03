import { SettingsEnum } from "@shared/utils/constants";
import type { DBEntity } from "./entity";
import { IRoles } from "./role";

export interface IUserSetting {
	key: SettingsEnum;
	value: any;
}

export interface IUsers extends DBEntity {
	name: string;
	email: string;
	birthDate?: Date;
	passwordHash: string;
	status: boolean;
	role?: IRoles;
	settings?: IUserSetting[];
}

export interface UpdateUserDTO extends Partial<IUsers> { }