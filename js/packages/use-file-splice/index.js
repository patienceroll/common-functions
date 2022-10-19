export function* createContext(file, sliceSize) {
    let index = 1;
    const fileSize = file.size;
    const length = Math.ceil(fileSize / sliceSize);
    while (index <= length) {
        yield (function ($index) {
            return () => file.slice(($index - 1) * sliceSize, $index === length ? file.size : $index * sliceSize);
        })(index);
        index += 1;
    }
}
const defaultOptions = {
    sliceSize: 4 * 1024 * 1024,
};
export default function useSpliceFile(file, options = {}) {
    const { sliceSize } = Object.assign(Object.assign({}, defaultOptions), options);
    let $file;
    if (file instanceof ArrayBuffer)
        $file = new Blob([file]);
    else
        $file = file;
    return {
        blobArray: Array.from(createContext($file, sliceSize)),
    };
}
