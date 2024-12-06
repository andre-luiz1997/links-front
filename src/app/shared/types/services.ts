export interface CRUDService {
    getAll(where?: any): void;
    getOne(id: any): void;
    create(data: any): void;
    update(id: any, data: any): void;
    delete(id: any): void;
}