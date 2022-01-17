import buildQuery from './build-query';

function testBuildQuery(
	params: Parameters<typeof buildQuery>[0],
	toBe: string,
	descrip: string
) {
	test(`build-query@${descrip}`, () => {
		expect(buildQuery(params)).toBe(toBe);
	});
}

testBuildQuery(
	{ array: [1, 2, 3, 4] },
	'array[]=1&array[]=2&array[]=3&array[]=4',
	'array'
);

testBuildQuery({ number: 1, type: '类型' }, 'number=1&type=类型', 'mormal');

testBuildQuery({ object: { a: 'a' } }, 'object={"a":"a"}', 'object');

testBuildQuery({ value: null }, '', 'null');

testBuildQuery({ value: undefined }, '', 'undefined');
