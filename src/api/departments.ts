import axios from "axios";
import {HEADERS, routes} from "./routes.ts";
import {IDepartment} from "../types/departments.ts";

export const GetAllDepartments = async () => {
    const req = await axios.get<IDepartment[]>(routes.DEPARTMENT_GET_CREATE, {
        headers: HEADERS
    });
    return req
}