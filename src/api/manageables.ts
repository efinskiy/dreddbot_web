import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { IManageable, IManageableSaturated } from '../types/manageable.ts';

export const GetAllManageables = async () => {
    return await axios.get<IManageable[]>(routes.MANAGEABLES_GET_ALL, {
        headers: HEADERS,
    });
};

export const GetOneManageable = async (id: number) => {
    return await axios.get<IManageableSaturated>(
        `${routes.MANAGEABLES_GET_ONE}${id}`,
        {
            headers: HEADERS,
        }
    );
};
