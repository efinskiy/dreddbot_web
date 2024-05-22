import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { IRegistry } from '../types/registry.ts';

export const GetAllRegistries = async () => {
    return await axios.get<IRegistry[]>(routes.REGISTRY_ROOT, {
        headers: HEADERS,
    });
};
