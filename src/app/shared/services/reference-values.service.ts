import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serializeParams, type CRUDService, type DefaultPaginatedResponse, type DefaultResponse, type IReferenceValues } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReferenceValuesService implements CRUDService {
  private ENDPOINT = `${environment.SERVER_URL}/reference-values`;

  constructor(private httpClient: HttpClient) { }

  save(data: any) {
    if (isEmpty(data._id)) return this.create(data);
    return this.update(data._id, data);
  }

  getAll(where?: any) {
    return this.httpClient.get<DefaultPaginatedResponse<IReferenceValues[]>>(`${this.ENDPOINT}${where ? `?${serializeParams(where)}` : ''}`);
  }

  getOne(id: any) {
    return this.httpClient.get<DefaultResponse<IReferenceValues>>(`${this.ENDPOINT}/${id}`);
  }
  create(data: any) {
    return this.httpClient.post<DefaultResponse<IReferenceValues>>(this.ENDPOINT, data);
  }
  update(id: any, data: any) {
    return this.httpClient.put<DefaultResponse<IReferenceValues>>(`${this.ENDPOINT}/${id}`, data);
  }
  delete(id: any) {
    return this.httpClient.delete(`${this.ENDPOINT}/${id}`);
  }
}
