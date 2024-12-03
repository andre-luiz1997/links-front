export function isEmpty<T>(value: T): value is Extract<T, undefined | null | ''> {
	return value === null || value === undefined || value === '';
}

export function emptyToUndefined(value: any) {
	return isEmpty(value) ? undefined : value;
}

export const convertToCamelCase = (key: string): string => {
	return key.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};