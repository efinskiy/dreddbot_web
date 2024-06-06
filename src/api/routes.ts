import Cookies from 'js-cookie';

const _BASE_URL = 'http://manager.vak.cr911:8000';
// const _BASE_URL = 'http://bot.local:8000';

export const HEADERS = {
    Authorization: `Bearer ${Cookies.get('at')}`,
};

export const routes = {
    AUTH_ROUTE: `${_BASE_URL}/auth/login`,
    AUTH_GET_USER: `${_BASE_URL}/auth/me`,

    USERS_GET: `${_BASE_URL}/users/`,
    USER_GET: `${_BASE_URL}/users/user/`,
    USER_SEARCH: `${_BASE_URL}/users/search`,
    USERS_GET_ALL: `${_BASE_URL}/users/all`,

    DEPARTMENT_GET_CREATE: `${_BASE_URL}/department/`,
    DEPARTMENT_GET_ONE: `${_BASE_URL}/department/get`,
    DEPARTMENT_GET_AVAILABLE: `${_BASE_URL}/department/available_users`,
    DEPARTMENT_ASSIGN: `${_BASE_URL}/department/users/assign`,
    DEPARTMENT_USERS_GET: `${_BASE_URL}/department/users`,
    DEPARTMENT_MANAGEABLES_GET: `${_BASE_URL}/department/manageables`,
    DEPARTMENT_MANAGEABLES_ASSIGN: `${_BASE_URL}/department/manageables/assign`,

    MANAGEABLES_GET_ALL: `${_BASE_URL}/manageables`,
    MANAGEABLES_GET_ONE: `${_BASE_URL}/manageables/`,

    REGISTRY_ROOT: `${_BASE_URL}/registries`,
    REGISTRY_GET_ONE: `${_BASE_URL}/registries/get/`,
    REGISTRY_NEW: `${_BASE_URL}/registries/new`,
    REGISTRY_UPDATE: `${_BASE_URL}/registries/update`,
    REGISTRY_DELETE: `${_BASE_URL}/registries/delete/`,

    PERMISSIONS_GET: `${_BASE_URL}/permissions/`,
    PERMISSIONS_GET_USERS: `${_BASE_URL}/permissions/get_users`,
    PERMISSIONS_ASSIGN: `${_BASE_URL}/permissions/assign`,
    PERMISSIONS_REVORK: `${_BASE_URL}/permissions/revoke`,
};
