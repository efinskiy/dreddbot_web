import {IUserAuthData} from "../types/user.ts";
import axios from "axios";
import {routes} from "./routes.ts";
import {IAuthResponse200} from "../types/auth.ts";

export const call_auth_user = async (user: IUserAuthData) => {
    const request = await axios.post<IAuthResponse200>(routes.AUTH_ROUTE, {...user})
    const response = request.data;
    return response
}