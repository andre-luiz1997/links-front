import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CRUDService, DefaultPaginatedRequest, DefaultPaginatedResponse, DefaultResponse, serializeParams } from '@shared/types';
import { ILinks } from '@shared/types/entities/domain/links';
import { isEmpty } from '@shared/utils/common';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LinksService implements CRUDService {
  private ENDPOINT = `${environment.SERVER_URL}/links`;

  constructor(
    private httpClient: HttpClient
  ) { }

  save(data: any) {
    if(isEmpty(data._id)) return this.create(data);
    return this.update(data._id, data);
  }

  getOneByToken(token: string) {
    return this.httpClient.get<DefaultResponse<ILinks>>(`${this.ENDPOINT}/token/${token}`);
  }

  getAll(where?: DefaultPaginatedRequest) {
		return this.httpClient.get<DefaultPaginatedResponse<ILinks[]>>(`${this.ENDPOINT}${where ? `?${serializeParams(where)}` : ''}`);
  }

  createDefault() {
    return this.httpClient.post<DefaultResponse<ILinks>>(`${this.ENDPOINT}/default`,{});
  }
  create(data: any) {
    return this.httpClient.post<DefaultResponse<ILinks>>(this.ENDPOINT, data);
  }
  update(id: any, data: any) {
    return this.httpClient.patch<DefaultResponse<ILinks>>(`${this.ENDPOINT}/${id}`, data);
  }
  delete(id: any) {
    return this.httpClient.delete<DefaultResponse<ILinks>>(`${this.ENDPOINT}/${id}`);
  }

  getOne(id: string) {
    return this.httpClient.get<DefaultResponse<ILinks>>(`${this.ENDPOINT}/${id}`);
  }

}
