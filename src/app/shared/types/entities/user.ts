import type { DBEntity } from "./entity";

export interface IUsers extends DBEntity {
	name: string;
	email: string;
	passwordHash: string;
	status: boolean;
}
