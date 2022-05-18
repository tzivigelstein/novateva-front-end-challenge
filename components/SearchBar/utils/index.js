export function debounce(callback, time) {
  let timeout = null
  return function executedCallback(...args) {
    const debounced = () => {
      timeout = null

      callback(...args)
    }

    clearTimeout(timeout)

    timeout = setTimeout(debounced, time)
  }
}
