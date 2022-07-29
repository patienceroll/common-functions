/** ### 节流
 * - options.during 节流时间
 * - 会把函数的返回值通过promise返回
 */
export default function useValve(func, options = { during: 300 }) {
    const { during } = options;
    let lastRunTime = 0;
    return (...params) => {
        const currentTime = +new Date();
        return new Promise((resolve, reject) => {
            const outOfValveDuring = currentTime - lastRunTime > during;
            lastRunTime = currentTime;
            if (outOfValveDuring)
                resolve(func(...params));
            else
                reject();
        });
    };
}
