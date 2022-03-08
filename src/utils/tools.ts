export function debounce(fn: Function, delay: number): Function {
    let timer: any
    return (...args: any) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(args)
        }, delay)
    }
}
