/**
 * @interface User {
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
 * @interface Response {
 *  @property { boolean } ok - is fetch status code < 400>?
 *  @property { number } status - status code
 *  @property { string } statusText
 *  @property { boolean } redirected - есть ли редирект?
 *  @property { string } url - полный url запроса
 *  @property { object } headers - заголовки
 *
 * }
 */

/**
 * @function parseQueryParams - парсит объект в строку с query параметрами
 * @param { object } objectWithQuery - объект с query параметрами, где название это ключ, а значение - это значение ключа
 * @returns { string } - возвращает строка с query параметрами
 */
function parseQueryParams(objectWithQuery) {
    let query = '';
    const lastParam = Object.keys(objectWithQuery).at(-1);

    for (let [key, value] of Object.entries(objectWithQuery)) {
        query += `${key}=${value}`;

        if (key !== lastParam) {
            query += '&'
        }
    }

    return query;
}

/**
 * Получение пользователей с текущей страницы
 * @function getUsers
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
        }

        /**
         * Ответ приходящий с сервера
         * Можно конвертировать в json формат
         * @type { Response }
         */
        const result = await fetch('https://randomuser.me/api?' + parseQueryParams(queryParams));

        /** данные с сервера
         * @type { object }
         * @property { object } info
         * @property { User[] } results - массив пользователей
         */
        const data = await result.json();

        usersList.value = usersList.value.length === 0 ? data.results : [...usersList.value, ...data.results];
    } catch (e) {
        console.log(e);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
}