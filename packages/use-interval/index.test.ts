import useInterval from './index';

test('use-polling', () => {
	let count = 0;
	const [func, extend] = useInterval((callback: VoidFunction) => {
		count += 1;
		if (count === 4) {
			extend.stop();
			callback();
		}
	});
	return new Promise<void>((resolve) => {
		func(resolve);
	}).then(() => {
		expect(count).toBe(4);
	});
});
