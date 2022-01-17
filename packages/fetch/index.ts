import buildQuery from './build-query';

export function Get(
	url: string,
	params?: Record<string | number, unknown>,
	init?: RequestInit
) {
	const query = params ? buildQuery(params) : undefined;
	return fetch(query ? `${url}?${query}` : url, init);
}
