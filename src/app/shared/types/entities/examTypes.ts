import type { DBEntity } from "./entity";

export interface IExamTypesGroup {
  _id: string;
  name?: string;
  examTypes?: IExamTypes[];
}

export interface IExamTypes extends DBEntity {
  name: string;
  description?: string;
  /** Measurement unit.
   * @example mg/dl
   */
  unit?: string;
  examTypesGroups: IExamTypesGroup[];
}