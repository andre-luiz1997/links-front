import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CRUDService } from '@shared/types/services';
import { BehaviorSubject } from 'rxjs';
import { DefaultPaginatedResponse, IExamTypes } from '@shared/types';

@Injectable({
	providedIn: 'root',
})
export class ExamTypesService implements CRUDService {
	private ENDPOINT = `${environment.SERVER_URL}/exam-types`;

  $examTypes = new BehaviorSubject<IExamTypes[]>([]);

	constructor(private httpClient: HttpClient) {}

	getAll(where?: any) {
		return this.httpClient.get<DefaultPaginatedResponse<IExamTypes[]>>(this.ENDPOINT);
	}

	getOne(id: any): void {
		throw new Error('Method not implemented.');
	}
	create(data: any): void {
		throw new Error('Method not implemented.');
	}
	update(id: any, data: any): void {
		throw new Error('Method not implemented.');
	}
	delete(id: any): void {
		throw new Error('Method not implemented.');
	}
}
