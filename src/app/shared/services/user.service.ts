import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '@shared/services/shared.service';
import type { DefaultResponse, IUsers, UpdateUserDTO } from '@shared/types';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = `${environment.SERVER_URL}/users`;

  constructor(
    private httpClient: HttpClient,
    private sharedService: SharedService,
  ) {
  }

  async update(id: string, dto: UpdateUserDTO) {
    try {
      const response = await lastValueFrom(this.httpClient.patch<DefaultResponse<IUsers>>(`${this.endpoint}/${id}`, dto));
      return response;
    } catch (error) {
      throw error
    }
  }
}
