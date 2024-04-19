import axios from "axios";
import {HEADERS, routes} from "./routes.ts";
import {IUser, IUserInSearch} from "../types/user.ts";



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