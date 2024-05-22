import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { IUser, IUserInSearch, IUserUpdateResponse } from '../types/user.ts';

export const get_users = async () => {
    return await axios.get<IUserInSearch[]>(routes.USERS_GET, {
        headers: HEADERS,
    });
};

export const search_users = async (search: string) => {
    return await axios.get<IUserInSearch[]>(routes.USER_SEARCH, {
        headers: HEADERS,
        params: {
            q: search,
        },
    });
};

export const get_user = async (id: number) => {
    return await axios.get<IUser>(routes.USER_GET + id, { headers: HEADERS });
};

export const update_commentary = async (id: number, commentary: string) => {
    return await axios.patch<IUserUpdateResponse>(
        routes.USERS_GET + id + '/update_commentary',
        {
            value: commentary,
        },
        {
            headers: HEADERS,
        }
    );
};

export const grant_web_access = async (user_id: number, new_value: boolean) => {
    return await axios.patch<IUserUpdateResponse>(
        routes.USERS_GET + user_id + '/grant_web_access',
        {
            value: new_value,
        },
        {
            headers: HEADERS,
        }
    );
};

export const trust_user = async (user_id: number) => {
    return await axios.patch<IUserUpdateResponse>(
        routes.USERS_GET + user_id + '/trusted',
        {},
        {
            headers: HEADERS,
        }
    );
};

export const fire_user = async (user_id: number) => {
    const req = await axios.patch(
        routes.USERS_GET + user_id + '/fire',
        {},
        {
            headers: HEADERS,
        }
    );
    return req;
};

export const kick_user = async (user_id: number, chat_id: number) => {
    return await axios.post<IUserUpdateResponse>(
        routes.USERS_GET + user_id + '/kick',
        {},
        {
            params: {
                chat_id: chat_id,
            },
            headers: HEADERS,
        }
    );
};
