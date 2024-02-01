/**
 * обертка, которая позволяет вызывать функцию не чаще чем заданное кол-во милисекунд
 * @param { function } callback - колбек функция, которую оборачиваем в обертку
 * @param { number } timeout - задержка в милисекундах
 */
export function throttle(callback, timeout) {
    let timer = null

    return function (...args) {
        if (timer) return

        timer = setTimeout(() => {
            callback(...args)

            clearTimeout(timer)
            timer = null
        }, timeout)
    }
}
