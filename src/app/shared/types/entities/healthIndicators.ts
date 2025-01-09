import { DBEntity } from "./entity";
import { IUsers } from "./user";

export enum HealthIndicatorEnum {
  WEIGHT = 'weight',
  BLOOD_PRESSURE = 'blood-pressure',
  CALORIES = 'calories',
}

export interface IHealthIndicators extends DBEntity {
  slug: HealthIndicatorEnum;
  user: IUsers;
  date: Date;
  value: number;
}