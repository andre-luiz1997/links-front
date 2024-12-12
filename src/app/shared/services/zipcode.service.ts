import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultResponse, IAddress } from '@shared/types';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ZipcodeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  get(zipcode: string, country = 'BRA') {
    return this.httpClient.get<DefaultResponse<IAddress>>(`${environment.SERVER_URL}/utils/zipcode/${zipcode}?country=${country}`);
  }
}
