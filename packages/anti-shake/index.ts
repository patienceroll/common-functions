export default function useAntiShake<
  Params extends unknown[],
  ReturnType = unknown
>(
	method: (...params: Params) => Promise<ReturnType>,
	options = { delay: 300 }
) {
	let Timer = NaN;
	let count = 0;
	return (...arg: Params) =>
		new Promise<ReturnType>((resolve, reject) => {
			if (Timer) clearTimeout(Timer);
			if (count === Number.MAX_SAFE_INTEGER) count = 0;
			else count++;
			const countCloser = count;
			Timer = setTimeout(() => {
				method(...arg)
					.then((res) => {
						if (count === countCloser) resolve(res);
						else reject(res);
					})
					.catch((err) => {
						reject(err);
					});
			}, options.delay);
		});
}
