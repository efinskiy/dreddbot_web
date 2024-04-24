import axios from "axios";
import {HEADERS, routes} from "./routes.ts";
import {IDepartment, IDepartmentWithManageables, IDepartmentWithUsers} from "../types/departments.ts";
import {IUserClear} from "../types/user.ts";


export const GetAllDepartments = async () => {
    return await axios.get<IDepartment[]>(routes.DEPARTMENT_GET_CREATE, {
        headers: HEADERS
    })
}


export const GetDepartment = async (id: number) => {
    return await axios.get<IDepartment>(routes.DEPARTMENT_GET_ONE, {
        headers: HEADERS,
        params: {
            department_id: id
        }
    })
}

export const GetDepartmentUsers = async (id: number) => {
    return await axios.get<IDepartmentWithUsers>(routes.DEPARTMENT_USERS_GET, {
        headers: HEADERS,
        params: {
            dep_id: id
        }
    })
}

export const GetDepartmentManageables = async (id: number) => {
    return await axios.get<IDepartmentWithManageables>(routes.DEPARTMENT_MANAGEABLES_GET, {
        headers: HEADERS,
        params: {
            dep_id: id
        }
    })
}

export const GetDepartmentAvailableUsers = async (id: number) => {
    return await axios.get<IUserClear[]>(routes.DEPARTMENT_GET_AVAILABLE, {
        headers: HEADERS,
        params: {
            dep_id: id
        }
    })
}