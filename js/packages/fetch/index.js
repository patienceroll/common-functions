import buildQuery from './build-query';
function isIntanceofBodyInit(data) {
    return (data instanceof ReadableStream ||
        data instanceof Blob ||
        data instanceof ArrayBuffer ||
        data instanceof FormData ||
        data instanceof URLSearchParams ||
        typeof data === 'string');
}
function Fetch(url, params, init = {}) {
    let query;
    let body;
    const { method = 'GET', paramsSerializer } = init;
    if (['GET', 'DELETE', 'HEAD'].includes(method)) {
        if (params)
            query = paramsSerializer
                ? paramsSerializer(params)
                : buildQuery(params);
    }
    else if (['POST', 'PUT', 'PATCH'].includes(method)) {
        if (isIntanceofBodyInit(params))
            body = params;
        else
            body = JSON.stringify(params);
    }
    return fetch(query ? `${url}?${query}` : url, Object.assign(Object.assign({}, init), { method, body }));
}
function Get(url, params, init) {
    const query = params ? buildQuery(params) : undefined;
    return fetch(query ? `${url}?${query}` : url, init);
}
function Delete(url, params, init) {
    return Fetch(url, params, Object.assign(Object.assign({}, init), { method: 'DELETE' }));
}
function Post(url, params, init) {
    return Fetch(url, params, Object.assign(Object.assign({}, init), { method: 'POST' }));
}
function Put(url, params, init) {
    return Fetch(url, params, Object.assign(Object.assign({}, init), { method: 'PUT' }));
}
function Patch(url, params, init) {
    return Fetch(url, params, Object.assign(Object.assign({}, init), { method: 'PATCH' }));
}
export { Get, Patch, Put, Post, Delete, Fetch };
