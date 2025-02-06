import { DBEntity } from "./entity";

export enum PlanFrequencyEnum {
  MONTHLY = 'monthly',
  YEARLY = 'yearly'
}

export interface IPlanBilling {
  price: number;
  frequency: PlanFrequencyEnum;
  trialPeriodDays?: number;
}

export interface IPlans extends DBEntity {
  name: string;
  description?: string;
  billing: IPlanBilling;
  isDefault: boolean;
  status: boolean;
}