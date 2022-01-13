// function encode(val: string) {
// 	return encodeURIComponent(val)
// 		.replace(/%3A/gi, ':')
// 		.replace(/%24/g, '$')
// 		.replace(/%2C/gi, ',')
// 		.replace(/%20/g, '+')
// 		.replace(/%5B/gi, '[')
// 		.replace(/%5D/gi, ']');
// }

export default function buildQuery(
	params: URLSearchParams | Record<string | number, unknown>
) {
	let query = '';
	if (params instanceof URLSearchParams) {
		query = params.toString();
	} else {
		const KeyValuePairStrings: string[] = [];
		Object.keys(params).forEach((key) => {
			const value = params[key];
			if (Object.is(value, null) || Object.is(value, undefined)) return;
			else if (Array.isArray(value)) {
				value.forEach((v) => {
					if (v instanceof Date) {
						KeyValuePairStrings.push(`${key}[]=${v.toISOString()}`);
					} else if (!Object.is(v, null) && typeof v === 'object') {
						KeyValuePairStrings.push(`${key}[]=${JSON.stringify(v)}`);
					} else {
						KeyValuePairStrings.push(`${key}[]=${v}`);
					}
				});
			} else {
				if (value instanceof Date) {
					KeyValuePairStrings.push(`${key}=${value.toISOString()}`);
				} else if (!Object.is(value, null) && typeof value === 'object') {
					KeyValuePairStrings.push(`${key}=${JSON.stringify(value)}`);
				} else {
					KeyValuePairStrings.push(`${key}=${value}`);
				}
			}
		});
		query = KeyValuePairStrings.join('&');
	}
	return query;
}
