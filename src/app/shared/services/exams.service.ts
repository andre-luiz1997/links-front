import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDService, DefaultPaginatedResponse, DefaultResponse, IExams, serializeParams } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExamsService implements CRUDService {
  private ENDPOINT = `${environment.SERVER_URL}/exams`;

  constructor(private httpClient: HttpClient) { }

  save(data: any) {
    if (isEmpty(data._id)) return this.create(data);
    return this.update(data._id, data);
  }

  getAll(where?: any) {
    return this.httpClient.get<DefaultPaginatedResponse<IExams[]>>(`${this.ENDPOINT}${where ? `?${serializeParams(where)}` : ''}`);
  }

  getOne(id: any) {
    return this.httpClient.get<DefaultResponse<IExams>>(`${this.ENDPOINT}/${id}`);
  }
  create(data: any) {
    return this.httpClient.post<DefaultResponse<IExams>>(this.ENDPOINT, data);
  }
  update(id: any, data: any) {
    return this.httpClient.patch<DefaultResponse<IExams>>(`${this.ENDPOINT}/${id}`, data);
  }
  delete(id: any) {
    return this.httpClient.delete(`${this.ENDPOINT}/${id}`);
  }
}
