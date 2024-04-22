import axios from "axios";
import {HEADERS, routes} from "./routes.ts";
import {IUser, IUserInSearch, IUserUpdateResponse} from "../types/user.ts";



export const get_users = async () => {
    const request = await axios.get<IUserInSearch[]>(routes.USERS_GET, {
        headers: HEADERS,
    });
    const response = request.data
    return response
}

export const search_users = async (search: string) => {
    const request = await axios.get<IUserInSearch[]>(routes.USER_SEARCH, {
        headers: HEADERS,
        params: {
            q: search
        }
    });
    const response = request.data
    return response
}



export const get_user = async (id: number) => {
    const request = await axios.get<IUser>(
        routes.USER_GET + id,
        {headers: HEADERS,}
    );
    const response = request.data
    return response
}

export const update_commentary = async (id: number, commentary: string) => {
    const request = await axios.patch<IUserUpdateResponse>(
        routes.USERS_GET + id + '/update_commentary',
        {
            value: commentary
        },
        {
            headers: HEADERS,
        }
    );
    const response = request.data
    return response
}

export const grant_web_access = async (user_id: number, new_value: boolean) => {
    const req = await axios.patch<IUserUpdateResponse>(
        routes.USERS_GET + user_id + '/grant_web_access',
        {
            value: new_value,
        },
        {
            headers: HEADERS,
        }
    )
    const response = req.data
    return response
}

export const fire_user = async (user_id: number) => {
    const req = await axios.patch(
        routes.USERS_GET + user_id + '/fire',
        {},
        {
            headers: HEADERS
        }
    )

    return req
}


export const kick_user = async (user_id: number, chat_id: number) => {
    const req = await axios.post<IUserUpdateResponse>(
        routes.USERS_GET + user_id + '/kick',
        {},
        {
            params: {
                chat_id: chat_id
            },
            headers: HEADERS
        },
    )
    return req
}