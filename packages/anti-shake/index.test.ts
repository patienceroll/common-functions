import useAntiShake from './index';

/**
 * ## 测试防抖函数
 * @param tobe 期望值,这里成功防抖为 10,未防抖结果为 55(1~10的求和)
 * @param delay 防抖函数调用间隔单位ms
 * @param antiShakeDelay 防抖函数防抖间隔
 */
const testAntiShake = (tobe: number, delay: number, antiShakeDelay = 300) => {
	const antiShakedFunction = useAntiShake(
		(id: number) => Promise.resolve(id),
		{ delay: antiShakeDelay }
	);
	return new Promise<number>((resolve) => {
		let i = 1;
		let addition = 0;
		const Timer = setInterval(() => {
			antiShakedFunction(i).then((id) => {
				if (id >= 10) {
					addition += id;
					resolve(addition);
				} else addition += id;
			});

			i++;
			if (i > 10) clearInterval(Timer);
		}, delay);
	}).then((solvedValue) => {
		expect(solvedValue).toBe(tobe);
	});
};

/** 模拟输入间隔为 100ms,没超过防抖间隔300ms,需要防抖 */
test('anti-shake.js', () => testAntiShake(10, 100));


/** 模拟输入间隔为 300ms,刚好等于防抖间隔300ms,不需要防抖 */
test('anti-shake.js', () => testAntiShake(55, 300));

/** 模拟输入间隔为 299ms,刚好小于防抖间隔300ms,需要防抖 */
test('anti-shake.js', () => testAntiShake(10, 299));

/** 模拟输入间隔为 301ms,刚好大于防抖间隔300ms,不需要防抖 */
test('anti-shake.js', () => testAntiShake(55, 301));

/** 模拟输入间隔为 350ms,小于防抖间隔400ms,需要防抖 */
test('anti-shake.js', () => testAntiShake(10, 350, 400));

/** 模拟输入间隔为 200ms,小于于防抖间隔199ms,不需要防抖 */
test('anti-shake.js', () => testAntiShake(55, 200, 199));
