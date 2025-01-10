import dayjs from "dayjs";

export type FilterOperators =
	| 'LIKE'
	| 'LIKE_ID'
	| 'NOT LIKE'
	| 'GREATER THAN'
	| 'GREATER THAN OR EQUAL'
	| 'LESS THAN'
	| 'LESS THAN OR EQUAL'
	| 'IN'
	| 'IS'
	| 'IS NOT'
	| 'NOT IN'
	| 'IS NULL'
	| 'IS NULL OR NOT EXISTS'
	| 'IS NOT NULL'
	| 'BETWEEN'
	| '%%'
	| '%_'
	| '_%';

export type SortOrder = -1 | 1;

export interface PaginationFilter {
	field: string;
	value?: string | string[] | number | number[] | Date | Date[];
	operator: FilterOperators;
}

export interface DefaultPaginatedRequest {
	skip?: number;
	limit?: number;
	sortBy?: string | string[];
	sortOrder?: SortOrder | SortOrder[];
	globalFilter?: string | string[];
	filters?: PaginationFilter[];
}

// Helper function to serialize the url object
export function serializeParams(params: any): string {
	const query = new URLSearchParams();

	Object.entries(params).forEach(([key, value]: [string, any]) => {
		if (Array.isArray(value)) {
			// If the value is an array, convert it to a JSON string
			query.append(key, JSON.stringify(value));
		} else if (typeof value === 'object' && value !== null) {
			// For complex objects (like filters), also serialize as JSON
			query.append(key, JSON.stringify(value));
		} else if (value !== undefined) {
			// Add scalar values directly
			query.append(key, String(value));
		}
	});

	return query.toString();
}