/**
 * @typedef User {
 *     @property { string } cell - номер телефона
 *     @property { string } email - почта
 *     @property { string } gender - пол (м/ж)
 *
 *     @property { object } picture - объект с разными размерами картинок
 *     @property { string } picture.large - большая картинка
 *     @property { string } picture.medium - средняя картинка
 *     @property { string } picture.thumbnail - маленькая картинка
 *
 *     @property { object } id - уникальные данные пользователя
 *     @property { string } id.name - уникальные данные пользователя
 *     @property { string } id.value - уникальные данные пользователя
 *
 *     @property { object } dob
 *     @property { number } dob.age
 *     @property { object } dob.date
 *
 *     @property { string } nat - национальность
 *
 *     @property { object } name - объект с ФИО
 *     @property { string } name.first - имя
 *     @property { string } name.last - фамилия
 *     @property { string } name.title - семейный статус (мисс, миссис, мистер и пр)
 * }
 */

/**
 * @typedef Response {
 *  @property { boolean } ok - статус код < 400?
 *  @property { number } status - статус код
 *  @property { string } statusText - расшифровка статуса
 *  @property { boolean } redirected - есть ли редирект?
 *  @property { string } url - полный url запроса
 *  @property { object } headers - заголовки
 *
 * }
 */

/**
 * Парсит объект в строку с query параметрами
 * @param { object } objectWithQuery - объект с query параметрами, где название это ключ, а значение - это значение ключа
 * @returns { string } - возвращает строка с query параметрами
 */
function parseQueryParams(objectWithQuery) {
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

/**
 * Функция отправляет запрос на пользователей и сохраняет результат в списке пользователей
 */
async function getUsers() {
  try {
    if (isLoading.value) {
      return null;
    }

    isLoading.value = true;

    const queryParams = {
      page: currentPage,
      results: countUserPerPage
    };

    const { PROTOCOL, DOMAIN } = process.env;
    const url = PROTOCOL + DOMAIN;

    /**
     * Ответ приходящий с сервера
     * Можно конвертировать в json формат
     * @type { Response }
     */
    const result = await fetch(`${url}api?${parseQueryParams(queryParams)}`);

    /** данные с сервера
     * @type { object }
     * @property { object } info
     * @property { number } info.page - номер страницы
     * @property { number } info.results - кол-во запрашиваемых пользователей
     * @property { string } info.seed - кол-во запрашиваемых пользователей
     * @property { string } info.version - кол-во запрашиваемых пользователей
     *
     * @property { User[] } results - массив пользователей
     */
    const data = await result.json();

    usersList.value =
      usersList.value.length === 0
        ? data.results
        : [...usersList.value, ...data.results];
  } catch (error) {
    isError.value = true;
    throw new Error('Ошибка при получении пользователей');
  } finally {
    isLoading.value = false;
  }
}
