import { hookstate, useHookstate } from '@hookstate/core';
import { UserAuthData } from '../types/user.ts';
import { AuthData, AuthResponse200 } from '../types/auth.ts';
import Cookies from 'js-cookie';

export const validate_session = () => {
    const vu = Number(Cookies.get('vu'));

    if (isNaN(vu)) {
        return false;
    }
    return vu - Math.round(Date.now() / 1000) > 0;
};

const initialState: AuthData = {
    isLoggedIn: validate_session(),
    user_id: undefined,
    permissions: [],
    name: undefined,
    valid_until: Number(Cookies.get('vu')),
    access_token: Cookies.get('at'),
};

const authState = hookstate(initialState);

export const auth_user = (user: UserAuthData, auth_data: AuthResponse200) => {
    authState.set({
        isLoggedIn: true,
        user_id: user.id,
        name: user.first_name + user.last_name,
        valid_until: auth_data.expires,
        access_token: auth_data.access_token,
        permissions: [],
    });
};

export const logout_user = () => {
    authState.set(initialState);
    Cookies.remove('at');
    Cookies.remove('vu');
};

export const useAuthState = () => {
    return useHookstate(authState);
};
