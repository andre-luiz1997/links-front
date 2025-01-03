import type { LangService } from "@shared/services/lang.service";
import dayjs from "dayjs";
import { formatToCurrency } from "./currency";

export function isEmpty<T>(value: T): value is Extract<T, undefined | null | ''> {
	return value === null || value === undefined || value === '';
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
	type: 'days' | 'months',
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

	if (type === 'days') {
		let current = startDate;
		while (current.isBefore(endDate) || current.isSame(endDate)) {
			result.push(current.format('YYYY-MM-DD'));
			current = current.add(1, 'day');
		}
	} else if (type === 'months') {
		let current = startDate.startOf('month');
		const endMonth = endDate.startOf('month');
		while (current.isBefore(endMonth) || current.isSame(endMonth)) {
			result.push(current.format('YYYY-MM'));
			current = current.add(1, 'month');
		}
	}

	return result;
}

export function getCssVariableValue(variableName: string): string {
	return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}