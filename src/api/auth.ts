import { UserAuthData, UserClearWithPermissions } from '../types/user.ts';
import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { AuthResponse200 } from '../types/auth.ts';

export const call_auth_user = async (user: UserAuthData) => {
    return await axios.post<AuthResponse200>(routes.AUTH_ROUTE, { ...user });
};

export const get_me = async () => {
    return await axios.get<UserClearWithPermissions>(routes.AUTH_GET_USER, {
        headers: HEADERS,
    });
};
