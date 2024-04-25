import axios from "axios";
import {HEADERS, routes} from "./routes.ts";
import {IManageable} from "../types/manageable.ts";

export const GetAllManageables = async () => {
    return await axios.get<IManageable[]>(
        routes.MANAGEABLES_GET_ALL,
        {
            headers: HEADERS
        }
        )
}