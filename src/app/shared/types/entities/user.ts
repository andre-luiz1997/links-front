import type { DBEntity } from "./entity";
import { IRoles } from "./role";

export interface IUsers extends DBEntity {
	name: string;
	email: string;
	passwordHash: string;
	status: boolean;
	role?: IRoles;
}
