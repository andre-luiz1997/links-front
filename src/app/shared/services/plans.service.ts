import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDService, DefaultPaginatedResponse, DefaultResponse, IPlans } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PlansService implements CRUDService {
  private ENDPOINT = `${environment.SERVER_URL}/plans`;

  constructor(private httpClient: HttpClient) { }

  save(data: any) {
    if (isEmpty(data._id)) return this.create(data);
    return this.update(data._id, data);
  }

  getAll(where?: any) {
    return this.httpClient.get<DefaultPaginatedResponse<IPlans[]>>(this.ENDPOINT);
  }

  getOne(id: any) {
    return this.httpClient.get<DefaultResponse<IPlans>>(`${this.ENDPOINT}/${id}`);
  }
  create(data: any) {
    return this.httpClient.post<DefaultResponse<IPlans>>(this.ENDPOINT, data);
  }
  update(id: any, data: any) {
    return this.httpClient.patch<DefaultResponse<IPlans>>(`${this.ENDPOINT}/${id}`, data);
  }
  delete(id: any) {
    return this.httpClient.delete(`${this.ENDPOINT}/${id}`);
  }
}