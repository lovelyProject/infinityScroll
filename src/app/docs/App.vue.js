/**
 * @interface Response {
 *     @property { string } cell - номер телефона
 *     @property { string } email - почта
 *     @property { string } gender - пол (м/ж)
 *     @property { object } picture - объект с разными размерами картинок
 *     @property { string } picture.large - большая картинка
 *     @property { string } picture.medium - средняя картинка
 *     @property { string } picture.thumbnail - маленькая картинка
 *     @property { object } id - уникальные данные пользователя
 *     @property { string } id.name - уникальные данные пользователя
 *     @property { string } id.value - уникальные данные пользователя
 *     @property { object } dob
 *     @property { number } dob.age
 *     @property { object } dob.date
 *     @property { string } nat - национальность
 * }
 */

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

        /**
         * @description массив пользователей с данными
         * @type { Response[] }
         */
        const { data } = await axios.get('api/', {
            params: {
                page: currentPage,
                results: countUserPerPage
            }
        });

        usersList.value = usersList.value.length === 0 ? data.results : [...usersList.value, ...data.results];
    } catch (e) {
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
}