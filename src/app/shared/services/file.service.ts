import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultResponse, IFiles } from '@shared/types';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ENDPOINT = `${environment.SERVER_URL}/files`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public upload(formData: FormData) {
    return this.httpClient.post<DefaultResponse<IFiles>>(`${this.ENDPOINT}`, formData);
  }
}
