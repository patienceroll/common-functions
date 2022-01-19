import { Fetch } from './index';
const FetchInfo = {
    id: 1,
};
function FetchWithResponse(...argument) {
    const [url, params, init = {}] = argument;
    const fetchId = `${FetchInfo.id}_${+new Date()}`;
    const mergeInit = Object.assign(Object.assign({}, init), { headers: Object.assign({}, (init.headers || {})) });
    if (FetchInfo.id === Number.MAX_SAFE_INTEGER)
        FetchInfo.id = 1;
    else
        FetchInfo.id += 1;
    if (params instanceof FormData || params instanceof URLSearchParams)
        params.append('_fetchId', fetchId);
    else if (typeof params === 'object' &&
        params.toString() === '[object Object]')
        params['_fetchId'] = fetchId;
    return Fetch(url, params, mergeInit)
        .then((res) => res.json())
        .then((res) => {
        if (res.code === '000000')
            return res;
        console.error(res.message);
        return Promise.reject(res);
    })
        .catch((err) => {
        if (typeof err === 'object' && !err.code) {
            console.error('网络错误');
        }
    });
}
export default FetchWithResponse;
