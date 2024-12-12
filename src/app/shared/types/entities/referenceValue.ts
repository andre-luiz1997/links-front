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
    fastingState?: string;
    /** @example Risco baixo, Risco alto */
    category?: string;
    minValue?: number;
    maxValue?: number;
    description?: string;
  }