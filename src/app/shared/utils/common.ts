export function isEmpty<T>(value: T): value is Extract<T, undefined | null | ''> {
	return value === null || value === undefined || value === '';
}

export function emptyToUndefined(value: any) {
	return isEmpty(value) ? undefined : value;
}