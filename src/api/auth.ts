import {IUserAuthData, IUserClearWithPermissions} from "../types/user.ts";
import axios from "axios";
import {HEADERS, routes} from "./routes.ts";
import {IAuthResponse200} from "../types/auth.ts";

export const call_auth_user = async (user: IUserAuthData) => {
    return await axios.post<IAuthResponse200>(routes.AUTH_ROUTE, {...user})
}

export const get_me = async () => {
    return await axios.get<IUserClearWithPermissions>(routes.AUTH_GET_USER, {
        headers: HEADERS,
    })
}