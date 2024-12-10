import type { LangService } from "@shared/services/lang.service";
import dayjs from "dayjs";
import { formatToCurrency } from "./currency";

export function isEmpty<T>(value: T): value is Extract<T, undefined | null | ''> {
	return value === null || value === undefined || value === '';
}

export function emptyToUndefined(value: any) {
	return isEmpty(value) ? undefined : value;
}

export function convertToCamelCase (key: string): string {
	return key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

export function isEmailValid (email: string): boolean {
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

