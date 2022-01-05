import usePolling from './index';

test('use-polling', () => {
	let count = 0;
	const func = usePolling(
		(resovle: (value: void | PromiseLike<void>) => void) => {
			count += 1;
			if (count === 4) {
				func.stop();
				resovle();
			}
		}
	);
	return new Promise<void>((resolve) => {
		func(resolve);
	}).then(() => {
		expect(count).toBe(4);
	});
});
