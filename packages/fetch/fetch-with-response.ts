import { Fetch, Params, FetchInit } from './index';

export interface BaseResponse<T = null> {
	code: string;
	data: T;
	message: string;
}

const FetchInfo = {
	id: 1,
};

export default function FetchResponse<T>(
	...argument: Parameters<typeof Fetch>
) {
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
			return Promise.reject({
				type: 'service-error',
				data: res,
			});
		})
		.catch((err) => {
			if (typeof err === 'object' && err.type === 'service-error') {
				console.error('后端响应错误', JSON.stringify(err));
			} else if (err instanceof DOMException && err.name === 'AbortError') {
				// 排除掉 abort 错误
				console.log('用户取消请求');
			} else {
				// 接口请求错误
			}
			return Promise.reject(err);
		});
}
