import type { DBEntity } from "./entity";

export interface IExamTypes extends DBEntity {
    name: string;
    description?: string;
    /** Measurement unit.
     * @example mg/dl
     */
    unit?: string; 
  }