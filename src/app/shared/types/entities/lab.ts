import { IAddress } from "../address";
import { DBEntity } from "./entity";

export interface ILabs extends DBEntity {
    name: string;
    address: IAddress;
    status: boolean;
  }