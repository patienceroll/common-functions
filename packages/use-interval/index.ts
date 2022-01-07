interface PollingFunction<Params extends unknown[] = unknown[]> {
	(...arg: Params): void;
}

export default function useInterval<Params extends unknown[] = unknown[]>(
	func: (...arg: Params) => void,
	options: { delay: number } = { delay: 1000 }
) {
	const { delay } = options;

	const extend: {
		timer?: NodeJS.Timeout;
		readonly stop: VoidFunction;
	} = {
		stop() {
			if (extend.timer) clearTimeout(extend.timer);
		},
	};

	const newFunction: PollingFunction<Params> = function (...arg) {
		extend.timer = setTimeout(() => {
			newFunction(...arg);
		}, delay);
		func(...arg);
	};

	return [newFunction, extend] as const;
}

