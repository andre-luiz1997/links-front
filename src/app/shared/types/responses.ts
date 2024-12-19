export interface DefaultResponse<T> {
	message?: string;
	data: T;
}

export interface DefaultPaginatedResponse<T>
	extends DefaultResponse<{ records: T; totalRecords: number;summary?: any }> {}
