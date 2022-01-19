/** ## 计数
 * 可用于短信计时,秒表等场合
 * - defaultCount - 开始计数的初始值
 */
export default function useCount(defaultCount, options = {}) {
    const { step = 1, during = 1000, end = 0, callback } = options;
    let Timer;
    let store = defaultCount;
    const Count = {
        get value() {
            return store;
        },
        set value(count) {
            store = count;
            if (callback)
                callback(count);
        },
    };
    function doCount() {
        Timer = setTimeout(() => {
            if (defaultCount > end) {
                const next = Count.value - step;
                if (next > end) {
                    Count.value = next;
                    doCount();
                }
                else
                    Count.value = end;
            }
            else if (defaultCount < end) {
                const next = Count.value + step;
                if (next < end) {
                    Count.value = next;
                    doCount();
                }
                else
                    Count.value = end;
            }
        }, during);
    }
    function stop() {
        if (Timer)
            clearTimeout(Timer);
    }
    function start() {
        stop();
        store = defaultCount;
        doCount();
    }
    function goOn() {
        doCount();
    }
    return { count: Count, start, stop, goOn };
}
