import buildQuery from './build-query';

export default function Get(
	url: string,
	params?: Record<string | number, unknown>,
	init?: RequestInit
) {
	const query = params ? buildQuery(params) : undefined;
	return fetch(query ? `${url}?${query}` : url, init);
}
