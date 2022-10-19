export type Options = {
	/** 字节,默认4mb 4 * 1024 * 1024 */
	sliceSize?: number;
};

export function* createContext(file: Blob, sliceSize: number) {
	let index = 1;
	const fileSize = file.size;
	const length = Math.ceil(fileSize / sliceSize);
	while (index <= length) {
		yield (function ($index: number) {
			return () =>
				file.slice(
					($index - 1) * sliceSize,
					$index === length ? file.size : $index * sliceSize
				);
		})(index);
		index += 1;
	}
}

const defaultOptions: Required<Options> = {
	sliceSize: 4 * 1024 * 1024,
};

export default function useSpliceFile(
	file: File | Blob | ArrayBuffer,
	options: Options = {}
) {
	const { sliceSize } = { ...defaultOptions, ...options };
	let $file: Blob;
	if (file instanceof ArrayBuffer) $file = new Blob([file]);
	else $file = file;
	return {
		blobArray: Array.from(createContext($file, sliceSize)),
	};
}
