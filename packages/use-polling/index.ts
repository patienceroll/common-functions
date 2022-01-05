interface PollingFunction<Params extends unknown[] = unknown[]> {
	(...arg: Params): void;
	timer?: NodeJS.Timeout;
	callback?: VoidFunction;
	stop: VoidFunction;
}

export default function usePolling<Params extends unknown[] = unknown[]>(
	func: (...arg: Params) => void,
	options: { delay: number } = { delay: 1000 }
) {
	const { delay } = options;

	const newFunction: PollingFunction<Params> = function (...arg) {
		func(...arg);
		newFunction.timer = setTimeout(() => {
			newFunction(...arg);
		}, delay);
	};

	Object.defineProperty(newFunction, 'stop', {
		configurable: false,
		enumerable: false,
		writable: false,
		value: function () {
			if (newFunction.timer) clearTimeout(newFunction.timer);
		},
	});

	return newFunction;
}
