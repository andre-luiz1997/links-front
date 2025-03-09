import type { LangService } from "@shared/services/lang.service";
import dayjs, { Dayjs } from "dayjs";
import { formatToCurrency } from "./currency";
import { environment } from "src/environments/environment.development";

export function getPublicAsset(url: string) {
	return `${environment.SERVER_URL}/${url}`
}

export function isEmpty<T>(value: T): value is Extract<T, undefined | null | ''> {
	return value === null || value === undefined || value === '';
}

export function isNotEmpty<T>(value: T): value is NonNullable<T> {
	return !isEmpty(value);
}

export function emptyToUndefined(value: any) {
	return isEmpty(value) ? undefined : value;
}

export function convertToCamelCase(key: string): string {
	return key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

export function isEmailValid(email: string): boolean {
	const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	if (email && regex.test(email.toLowerCase())) return true;
	return false;
};

export function getErrorMessage(langService: LangService, error: string, options: any, extras?: any) {
	if (!options || options === true) options = {};
	let message = langService.getMessage(`validation_error.${error}`);
	if (error == 'maxDate') {
		options.maxDate = dayjs(options.value).format('DD/MM/YYYY');
	}
	if (error == 'minDate') {
		options.minDate = dayjs(options.value).format('DD/MM/YYYY');
	}
	if (error == 'maxMoedaError') {
		if (extras?.moedaSimbolo == '%') {
			options.max = `${formatToCurrency(options.value)}%`;
		} else {
			options.max = `R$${formatToCurrency(options.value)}`;
		}
	}
	for (const key in options) {
		do {
			message = message.replace(`{{${key}}}`, options[key]);
		} while (message.search(`{{${key}}}`) != -1);
	}
	return message;
}

export function getDateRange(
	start: Date,
	end: Date,
	type: dayjs.ManipulateType,
): string[] {
	const startDate = dayjs(start);
	const endDate = dayjs(end);

	if (!startDate.isValid() || !endDate.isValid()) {
		throw new Error('Invalid date format');
	}

	if (startDate.isAfter(endDate)) {
		throw new Error('Start date must be before or equal to end date');
	}

	const result: string[] = [];
	let format: string = 'YYYY-MM-DD HH:00';
	let step: number = 1;
	let unit: dayjs.OpUnitType = 'days';
	switch (type) {
		case 'minutes': {
			unit = 'minutes';
			break;
		}
		case 'hours': {
			unit = 'hours';
			break;
		}
		case 'days': {
			format = 'YYYY-MM-DD';
			unit = 'days';
			break;
		}
		case 'months': {
			format = 'YYYY-MM';
			unit = 'months';
			break;
		}
	}
	let current = startDate;
	while (current.isBefore(endDate) || current.isSame(endDate)) {
		result.push(current.format(format));
		current = current.add(step, unit);
	}

	return result;
}

export function getCssVariableValue(variableName: string): string {
	return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}