import { Fetch, Params, FetchInit } from './index';


export interface BaseResponse<T = null> {
	code: string;
	data: T;
	message: string;
}

const FetchInfo = {
	id: 1,
};

export default function FetchWithResponse<T>(...argument: Parameters<typeof Fetch>) {
	const [url, params, init = {}] = argument;
	const fetchId = `${FetchInfo.id}_${+new Date()}`;

	const mergeInit: FetchInit = {
		...init,
		headers: {
			...(init.headers || {}),
		},
	};

	if (FetchInfo.id === Number.MAX_SAFE_INTEGER) FetchInfo.id = 1;
	else FetchInfo.id += 1;

	if (params instanceof FormData || params instanceof URLSearchParams)
		params.append('_fetchId', fetchId);
	else if (
		typeof params === 'object' &&
		params.toString() === '[object Object]'
	)
		(params as Exclude<Params, BodyInit>)['_fetchId'] = fetchId;

	return Fetch(url, params, mergeInit)
		.then((res) => res.json())
		.then((res: BaseResponse<T>) => {
			if (res.code === '000000') return res;
			console.error(res.message);
			return Promise.reject(res);
		})
		.catch((err) => {
			if (typeof err === 'object' && !err.code) {
				console.error('网络错误');
			}
		});
}
