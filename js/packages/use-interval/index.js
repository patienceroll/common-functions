export default function useInterval(func, options = { delay: 1000 }) {
    const { delay } = options;
    const extend = {
        stop() {
            if (extend.timer)
                clearTimeout(extend.timer);
        },
    };
    const newFunction = function (...arg) {
        extend.timer = setTimeout(() => {
            newFunction(...arg);
        }, delay);
        func(...arg);
    };
    return [newFunction, extend];
}
