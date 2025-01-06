import { DBEntity } from "./entity";

export interface IHealthIndicators extends DBEntity {
    name: string;
    description?: string;
    /** Measurement unit.
     * @example mg/dl
     */
    unit?: string;
    status: boolean;
  }