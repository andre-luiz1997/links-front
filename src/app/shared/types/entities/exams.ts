import { DBEntity } from "./entity";
import { IExamTypes } from "./examTypes";
import { ILabs } from "./lab";
import { IUsers } from "./user";

export interface IExams extends DBEntity {
    user: IUsers;
    date: Date;
    lab?: ILabs;
    results: IResultEntry[];
}

export interface IResultEntry {
    _id?: string;
    examType: IExamTypes;
    value: number;
    observations?: string;
    /** Method used
       * @example  Contagem Automatizada por Citometria de Fluxo
       */
    method?: string;
    /** Material used
     * @example  Sangue
     */
    material?: string;
    entryGroups?: IResultEntry[];
}