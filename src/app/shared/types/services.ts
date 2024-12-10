import { DefaultPaginatedRequest } from "./requests";

export interface CRUDService {
    getAll(where?: DefaultPaginatedRequest): void;
    getOne(id: any): void;
    create(data: any): void;
    update(id: any, data: any): void;
    save(data: any): void;
    delete(id: any): void;
}