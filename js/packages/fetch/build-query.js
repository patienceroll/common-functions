// function encode(val: string) {
// 	return encodeURIComponent(val)
// 		.replace(/%3A/gi, ':')
// 		.replace(/%24/g, '$')
// 		.replace(/%2C/gi, ',')
// 		.replace(/%20/g, '+')
// 		.replace(/%5B/gi, '[')
// 		.replace(/%5D/gi, ']');
// }
/**
 * ### 构建url的query参数
 * 1. date 对象会转为 .toISOString()
 * 2. 数组会转为 array[]=value1 & array[]=value2 的格式
 * 3. 对象会转为 JSON 字符串
 * 4. null 或 undefined 不传值
 * 5. 其余值类型不做处理
 */
export default function buildQuery(params) {
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
