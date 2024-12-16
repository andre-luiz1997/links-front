import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from '@shared/types/services';
import { BehaviorSubject } from 'rxjs';
import { DefaultPaginatedResponse, DefaultResponse, IExamTypes, serializeParams } from '@shared/types';
import { isEmpty } from '@shared/utils/common';

@Injectable({
	providedIn: 'root',
})
export class ExamTypesService implements CRUDService {
	private ENDPOINT = `${environment.SERVER_URL}/exam-types`;

	$examTypes = new BehaviorSubject<IExamTypes[]>([]);

	constructor(private httpClient: HttpClient) { }

	save(data: any) {
		if (isEmpty(data._id)) return this.create(data);
		return this.update(data._id, data);
	}

	getAll(where?: any) {
		return this.httpClient.get<DefaultPaginatedResponse<IExamTypes[]>>(`${this.ENDPOINT}${where ? `?${serializeParams(where)}` : ''}`);
	}

	getOne(id: any) {
		return this.httpClient.get<DefaultResponse<IExamTypes>>(`${this.ENDPOINT}/${id}`);
	}
	create(data: any) {
		return this.httpClient.post<DefaultResponse<IExamTypes>>(this.ENDPOINT, data);
	}
	update(id: any, data: any) {
		return this.httpClient.put<DefaultResponse<IExamTypes>>(`${this.ENDPOINT}/${id}`, data);
	}
	delete(id: any) {
		return this.httpClient.delete(`${this.ENDPOINT}/${id}`);
	}
}
