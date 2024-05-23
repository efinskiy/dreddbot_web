import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { IRegistry } from '../types/registry.ts';

export const GetAllRegistries = async () => {
    return await axios.get<IRegistry[]>(routes.REGISTRY_ROOT, {
        headers: HEADERS,
    });
};

export const DownloadRegistry = async (id: number) => {
    return await axios
        .get(routes.REGISTRY_GET_ONE + id, {
            headers: HEADERS,
            responseType: 'blob',
        })
        .then(() => window.open(routes.REGISTRY_GET_ONE + id));
};
