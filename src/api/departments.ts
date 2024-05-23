import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import {
    Department,
    DepartmentWithManageables,
    DepartmentWithUsers,
} from '../types/departments.ts';
import { UserClear } from '../types/user.ts';
import { IDepartmentChanges } from '../components/departmentObjectsEdit/departmentObjectEditUsers.component.tsx';

export const GetAllDepartments = async () => {
    return await axios.get<Department[]>(routes.DEPARTMENT_GET_CREATE, {
        headers: HEADERS,
    });
};

export const CreateDepartment = async (title: string) => {
    return await axios.post<Department>(
        routes.DEPARTMENT_GET_CREATE,
        {
            name: title,
        },
        {
            headers: HEADERS,
        }
    );
};

export const GetDepartment = async (id: number) => {
    return await axios.get<Department>(routes.DEPARTMENT_GET_ONE, {
        headers: HEADERS,
        params: {
            department_id: id,
        },
    });
};

export const GetDepartmentUsers = async (id: number) => {
    return await axios.get<DepartmentWithUsers>(routes.DEPARTMENT_USERS_GET, {
        headers: HEADERS,
        params: {
            dep_id: id,
        },
    });
};

export const GetDepartmentManageables = async (id: number) => {
    return await axios.get<DepartmentWithManageables>(
        routes.DEPARTMENT_MANAGEABLES_GET,
        {
            headers: HEADERS,
            params: {
                dep_id: id,
            },
        }
    );
};

export const GetAllUsers = async () => {
    return await axios.get<UserClear[]>(routes.USERS_GET_ALL, {
        headers: HEADERS,
    });
};

export const UpdateDepartmentUsers = async (
    id: number,
    update: IDepartmentChanges
) => {
    return await axios.post<IDepartmentChanges>(
        routes.DEPARTMENT_GET_CREATE + id + '/users/edit',
        update,
        {
            headers: HEADERS,
        }
    );
};

export const UpdateDepartmentManageables = async (
    id: number,
    update: IDepartmentChanges
) => {
    return await axios.post<IDepartmentChanges>(
        routes.DEPARTMENT_GET_CREATE + id + '/manageables/edit',
        update,
        {
            headers: HEADERS,
        }
    );
};
