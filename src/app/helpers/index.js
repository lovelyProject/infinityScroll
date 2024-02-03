/**
 * обертка, которая позволяет вызывать функцию не чаще чем заданное кол-во милисекунд
 * @param { function } callback - колбек функция, которую оборачиваем в обертку
 * @param { number } timeout - задержка в милисекундах
 */
export function throttle(callback, timeout) {
  let timer = null;

  return function (...args) {
    if (timer) return;

    timer = setTimeout(() => {
      callback(...args);

      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

/**
 * @function parseQueryParams - парсит объект в строку с query параметрами
 * @param { object } objectWithQuery - объект с query параметрами, где название это ключ, а значение - это значение ключа
 * @returns { string } - возвращает строка с query параметрами
 */
export function parseQueryParams(objectWithQuery) {
  let query = '';
  const lastParam = Object.keys(objectWithQuery).at(-1);

  for (const [key, value] of Object.entries(objectWithQuery)) {
    query += `${key}=${value}`;

    if (key !== lastParam) {
      query += '&';
    }
  }

  return query;
}
