export type Options = {
	/** 持续时间 ms */
	during: number;
};

/** ### 节流
 * - options.during 节流时间
 * - 会把函数的返回值通过promise返回
 */
export default function useValve(
	func: (...params: unknown[]) => unknown,
	options: Options = { during: 300 }
) {
	const { during } = options;
	let lastRunTime = 0;
	return (...params: Parameters<typeof func>) => {
		const currentTime = +new Date();
		return new Promise<ReturnType<typeof func>>((resolve, reject) => {
			const outOfValveDuring = (currentTime - lastRunTime) > during;
			lastRunTime = currentTime;
			if (outOfValveDuring) resolve(func(...params));
			else reject();
		});
	};
}
