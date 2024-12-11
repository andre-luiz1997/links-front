import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDService, DefaultPaginatedRequest, DefaultPaginatedResponse, DefaultResponse, IPermissions, IRoles, serializeParams } from '@shared/types';
import { isEmpty } from '@shared/utils/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CRUDService {
  private ENDPOINT = `${environment.SERVER_URL}/roles`;

  constructor(
    private httpClient: HttpClient
  ) { }

  save(data: any) {
    if(isEmpty(data._id)) return this.create(data);
    return this.update(data._id, data);
  }

  getAll(where?: DefaultPaginatedRequest) {
		return this.httpClient.get<DefaultPaginatedResponse<IRoles[]>>(`${this.ENDPOINT}${where ? `?${serializeParams(where)}` : ''}`);
  }

  getPermissions() {
    return this.httpClient.get<DefaultResponse<IPermissions[]>>(`${this.ENDPOINT}/permissions`);
  }

  create(data: any) {
    return this.httpClient.post<DefaultResponse<IRoles>>(this.ENDPOINT, data);
  }
  update(id: any, data: any) {
    return this.httpClient.patch<DefaultResponse<IRoles>>(`${this.ENDPOINT}/${id}`, data);
  }
  delete(id: any) {
    return this.httpClient.delete<DefaultResponse<IRoles>>(`${this.ENDPOINT}/${id}`);
  }

  getOne(id: string) {
    return this.httpClient.get<DefaultResponse<IRoles>>(`${this.ENDPOINT}/${id}`);
  }

}
