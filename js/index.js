function buildQuery(params) {
  let query = '';
  if (params instanceof URLSearchParams) {
      query = params.toString();
  }
  else {
      const KeyValuePairStrings = [];
      Object.keys(params).forEach((key) => {
          const value = params[key];
          if (Object.is(value, null) || Object.is(value, undefined))
              return;
          else if (Array.isArray(value)) {
              value.forEach((v) => {
                  if (v instanceof Date) {
                      KeyValuePairStrings.push(`${key}[]=${v.toISOString()}`);
                  }
                  else if (!Object.is(v, null) && typeof v === 'object') {
                      KeyValuePairStrings.push(`${key}[]=${JSON.stringify(v)}`);
                  }
                  else {
                      KeyValuePairStrings.push(`${key}[]=${v}`);
                  }
              });
          }
          else {
              if (value instanceof Date) {
                  KeyValuePairStrings.push(`${key}=${value.toISOString()}`);
              }
              else if (!Object.is(value, null) && typeof value === 'object') {
                  KeyValuePairStrings.push(`${key}=${JSON.stringify(value)}`);
              }
              else {
                  KeyValuePairStrings.push(`${key}=${value}`);
              }
          }
      });
      query = KeyValuePairStrings.join('&');
  }
  return query;
}


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


const FetchInfo = {
  id: 1,
};

function FetchResponse(...argument) {
  const [url, params, init = {}] = argument;
  const fetchId = `${FetchInfo.id}_${+new Date()}`;
  const mergeInit = Object.assign(Object.assign({}, init), { headers: Object.assign({}, (init.headers || {})) });
  /** 当请求传递的是 FormData 的时候,删除 Content-Type  */
  // if (params instanceof FormData && mergeInit.headers && mergeInit.headers['Content-Type']) {
  // 	delete mergeInit.headers['Content-Type'];
  // }
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
      .then((res) => {
      if (res.ok)
          return res.json();
      return Promise.reject(res);
  })
      .then((res) => {
      if (res.code === '000000')
          return res;
      return Promise.reject({
          type: 'service-error',
          data: res,
      });
  })
      .catch((err) => {
      if (typeof err === 'object' && err.type === 'service-error') {
          console.error('后端响应错误', JSON.stringify(err));
      }
      else if (err instanceof DOMException && err.name === 'AbortError') {
          // 排除掉 abort 错误
          console.log('用户取消请求');
      }
      else {
          // 接口请求错误
      }
      return Promise.reject(err);
  });
}
