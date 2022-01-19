import useCount from './index';

test('use-count@end&during', () => {
	const { count, start } = useCount(100, {
		end: 20,
		during: 10,
	});
	return new Promise<void>((resolve) => {
		start();
		setTimeout(() => {
			resolve();
		}, 2000);
	}).then(() => {
		expect(count.value).toBe(20);
	});
});

test('use-count@step&callback&during', () => {
	let resolve: VoidFunction;
	let lastCount = 0;
	const { start } = useCount(100, {
		step: 3,
		during: 10,
		callback(count) {
			lastCount += count;
			if (count === 0 && resolve) resolve();
		},
	});
	return new Promise<void>((res) => {
		resolve = res;
		start();
	}).then(() => {
		//  lastCount值为 n 为 0 ~ 32 的数字 (3n + 1) 的求和
		expect(lastCount).toBe(1617);
	});
});
