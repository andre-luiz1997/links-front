import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DATE_MASK_BR, DATE_TIME_MASK_BR, TIME_MASK } from '@shared/utils/constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
@Pipe({
	name: 'customDate',
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
	constructor(@Inject(LOCALE_ID) locale: string) {
		super(locale);
	}

	// @ts-ignore
	transform(
		value?: any,
		params?: { time?: boolean | 'extenso'; format?: string; timeOnly?: boolean },
	): string | null {
		if (!value) return null;
		let date: string;
		const tz = 'America/Sao_Paulo';
		if (params?.timeOnly) {
			return dayjs(value).utc().tz(tz).format(TIME_MASK);
		}
		if (params?.time === 'extenso') {
			return dayjs(value).fromNow();
		}
		if (params?.time) {
			date = dayjs(value)
				.utc()
				.tz('America/Sao_Paulo')
				.format(params?.format ?? DATE_TIME_MASK_BR);
		} else {
			date = dayjs(value)
				.utc()
				.tz('America/Sao_Paulo')
				.format(params?.format ?? DATE_MASK_BR);
		}
		if (!Number.isNaN(dayjs(value).toDate().getTime())) return date;
		return '-';
	}
}
