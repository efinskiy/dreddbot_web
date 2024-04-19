import Cookies from "js-cookie";

const _BASE_URL = "http://bot.local:8000";

export const HEADERS = {
    Authorization: `Bearer ${Cookies.get('at')}`,
}


export const routes = {
    AUTH_ROUTE: `${_BASE_URL}/auth/login`,
    USERS_GET: `${_BASE_URL}/users`,
    USER_GET: `${_BASE_URL}/users/user/`,
    USER_SEARCH: `${_BASE_URL}/users/search`,
}