import type { DBEntity } from "./entity";

export interface IExamTypesGroup {
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
  /**
   * Material of the exam.
   * @example Blood
   */
  material?: string;
  /**
    * Method of the exam.
    * @example ELISA
    */
  method?: string;
  examTypesGroups: IExamTypesGroup[];
}