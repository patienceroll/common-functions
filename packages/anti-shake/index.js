export default function useAntiShake(method, options = { delay: 300 }) {
  let Timer = NaN
  let count = 0
  return (...arg) =>
    new Promise((resolve, reject) => {
      if (Timer) clearTimeout(Timer)
      if (count === Number.MAX_SAFE_INTEGER) count = 0
      else count++
      const countCloser = count
      Timer = setTimeout(() => {
        method(...arg)
          .then((res) => {
            if (count === countCloser) resolve(res)
            else reject(res)
          })
          .catch((err) => {
            reject(err)
          })
      }, options.delay)
    })
}