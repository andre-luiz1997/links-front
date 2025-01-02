import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultResponse, IResultEntry, serializeParams } from '@shared/types';
import { DATE_MASK_US } from '@shared/utils/constants';
import dayjs from 'dayjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private ENDPOINT = `${environment.SERVER_URL}/reports`;

  constructor(
    private httpClient: HttpClient
  ) { }

  getExamTypeReport(examTypeId: string, props: { start: Date, end: Date }) {
    const serializedParams = serializeParams({ start: dayjs(props.start).format(DATE_MASK_US), end: dayjs(props.end).format(DATE_MASK_US) })
    return this.httpClient.get<DefaultResponse<{
      date: string,
      values: IResultEntry | null
    }[]>>(`${this.ENDPOINT}/exam-types/${examTypeId}?${serializedParams}`);
  }
  getExamTypesReport(examTypesIds: string[], props: { start: Date, end: Date }) {
    const serializedParams = serializeParams({ start: dayjs(props.start).format(DATE_MASK_US), end: dayjs(props.end).format(DATE_MASK_US), examTypeIds: examTypesIds.join(',') });
    return this.httpClient.get<DefaultResponse<{
      examTypeId: string,
      values: {
        date: string,
        values: IResultEntry | null
      }[]
    }[]>>(`${this.ENDPOINT}/exam-types?${serializedParams}`);
  }
}
