import buildQuery from './build-query';

test('build-query', () => {
	expect(buildQuery({ array: [1, 2, 3, 4], object: { a: 'a' } })).toBe(
		'array[]=1&array[]=2&array[]=3&array[]=4&object={"a":"a"}'
	);
});
