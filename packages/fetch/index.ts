import Fetch from './fetch';
import { Params, FetchInit } from './fetch';

const FetchInfo = {
	id: 1,
};

export interface BaseResponse<T = null> {
	code: string;
	data: T;
	message: string;
}

/**
 * ### 发起get请求
 * - 不管 init 里面的 method 传什么参数,都会发起 get 请求
 */
export function getResoponse<T>(...argument: Parameters<typeof Fetch>) {
	const [url, params = {}, init = {}] = argument;
	init.method = 'GET';
	return FetchResponse<T>(url, params, init);
}
/**
 * ### post
 * - 不管 init 里面的 method 传什么参数,都会发起 post 请求
 */
export function postResoponse<T>(...argument: Parameters<typeof Fetch>) {
	const [url, params = {}, init = {}] = argument;
	init.method = 'POST';
	return FetchResponse<T>(url, params, init);
}

/**
 * ### put
 * - 不管 init 里面的 method 传什么参数,都会发起 put 请求
 */
export function putResoponse<T>(...argument: Parameters<typeof Fetch>) {
	const [url, params = {}, init = {}] = argument;
	init.method = 'PUT';
	return FetchResponse<T>(url, params, init);
}

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

	/** 当请求传递的是 FormData 的时候,删除 Content-Type  */
	// if (params instanceof FormData && mergeInit.headers && mergeInit.headers['Content-Type']) {
	// 	delete mergeInit.headers['Content-Type'];
	// }

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
		.then((res) => {
			if (res.ok) return res.json();
			return Promise.reject(res);
		})
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
