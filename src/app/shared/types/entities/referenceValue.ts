import type { DBEntity } from "./entity";
import type { IExamTypes } from "./examTypes";

export interface IReferenceValues extends DBEntity {
  examType: IExamTypes;
  /** Age Range of value
   * @example Adultos com mais de 20 anos
   */
  ageRange?: string;
  /** Situation
   * @example Com jejum, Sem jejum
   */
  fastingValues?: {
    minValue?: number;
    maxValue?: number;
  }
  nonFastingValues?: {
    minValue?: number;
    maxValue?: number;
  }
  /** @example Risco baixo, Risco alto, Deficiência, Toxicidade */
  category?: string;
  description?: string;
}

