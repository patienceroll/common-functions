import useAntiShake from './index';

/**
 * ## 测试防抖函数
 * @param tobe 期望值,这里成功防抖为 10,未防抖结果为 55(1~10的求和)
 * @param delay 防抖函数调用间隔单位ms
 * @param antiShakeDelay 防抖函数防抖间隔
 */
const testAntiShake = (tobe: number, delay: number, antiShakeDelay = 30) => {
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

/** 模拟输入间隔为 10ms,没超过防抖间隔30ms,需要防抖 */
test('anti-shake', () => testAntiShake(10, 10));

/** 模拟输入间隔为 30ms,刚好等于防抖间隔30ms,不需要防抖 */
test('anti-shake', () => testAntiShake(55, 30));

/** 模拟输入间隔为 29ms,刚好小于防抖间隔30ms,需要防抖 */
test('anti-shake', () => testAntiShake(10, 29));

/** 模拟输入间隔为 31ms,刚好大于防抖间隔30ms,不需要防抖 */
test('anti-shake', () => testAntiShake(55, 31));

/** 模拟输入间隔为 35ms,小于防抖间隔40ms,需要防抖 */
test('anti-shake', () => testAntiShake(10, 35, 40));

/** 模拟输入间隔为 20ms,小于于防抖间隔19ms,不需要防抖 */
test('anti-shake', () => testAntiShake(55, 20, 19));
