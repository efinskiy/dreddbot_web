import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { PermissionsUser, Permission } from '../types/permissions.ts';

export const getUsers = async (setFunc: (arg: PermissionsUser[]) => void) => {
    return await axios
        .get<PermissionsUser[]>(routes.PERMISSIONS_GET_USERS, {
            headers: HEADERS,
        })
        .then((e) =>
            setFunc(
                e.data.map((el) => ({
                    ...el,
                    full_name: el.full_name.split(' None')[0],
                }))
            )
        );
};

export const getPermissionsAll = async (
    setFunc: (arg: Permission[]) => void
) => {
    return await axios
        .get<Permission[]>(routes.PERMISSIONS_GET, {
            headers: HEADERS,
        })
        .then((e) => setFunc(e.data));
};

export interface permissionsAssignArg {
    perm_id: number;
    user_id: number;
}

export const permissionsAssign = async (data: permissionsAssignArg) => {
    return await axios.post<never>(routes.PERMISSIONS_ASSIGN, data, {
        headers: HEADERS,
    });
};

export const permissionsRevork = async (data: permissionsAssignArg) => {
    return await axios.patch<never>(
        `${routes.PERMISSIONS_REVORK}/?user_id=${data.user_id}&permission_id=${data.perm_id}`,
        {},
        {
            headers: HEADERS,
        }
    );
};
