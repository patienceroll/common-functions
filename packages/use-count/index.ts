/** ## 计数
 * 可用于短信计时,秒表等场合
 * - defaultCount - 开始计数的初始值
 */
export default function useCount(
	defaultCount: number,
	options: {
		/** 计数步频,默认为 1 */
		step?: number;
		/** 计数间隔 单位为ms,默认 1000 */
		during?: number;
		/** 结束时的值,默认为0 */
		end?: number;
		/** count 变化时的回调 */
		callback?: (count: number) => void;
	} = {}
) {
	const { step = 1, during = 1000, end = 0, callback } = options;
	let Timer: NodeJS.Timeout;
	let store = defaultCount;
	const Count = {
		get value() {
			return store;
		},
		set value(count) {
			store = count;
			if (callback) callback(count);
		},
	};

	function doCount() {
		Timer = setTimeout(() => {
			if (store > end) {
				const next = Count.value - step;
				if (next > end) {
					Count.value = next;
					doCount();
				} else Count.value = end;
			} else if (store < end) {
				const next = Count.value + step;
				if (next < end) {
					Count.value = next;
					doCount();
				} else Count.value = end;
			}
		}, during);
	}

	function stop() {
		if (Timer) clearTimeout(Timer);
	}

	function start() {
		stop();
		store = defaultCount;
		doCount();
	}

	function goOn() {
		doCount();
	}

	function goWith(count: number) {
		store = count;
		doCount();
	}

	return { count: Count, start, stop, goOn, goWith };
}
