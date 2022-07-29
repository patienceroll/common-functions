export default function useValve(func, options = { during: 300 }) {
    const { during } = options;
    let lastRunTime = 0;
    return (...params) => {
        const currentTime = +new Date();
        return new Promise((resolve, reject) => {
            const outOfValveDuring = (currentTime - lastRunTime) > during;
            lastRunTime = currentTime;
            if (outOfValveDuring)
                resolve(func(...params));
            else
                reject();
        });
    };
}
