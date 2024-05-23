import axios from 'axios';
import { HEADERS, routes } from './routes.ts';
import { Registry } from '../types/registry.ts';

export const GetAllRegistries = async () => {
    return await axios.get<Registry[]>(routes.REGISTRY_ROOT, {
        headers: HEADERS,
    });
};

export const DownloadRegistry = async (id: number, name: string) => {
    const response = await fetch(routes.REGISTRY_GET_ONE + id, {
        method: 'GET',
        headers: HEADERS,
    });

    if (!response.ok) {
        throw new Error(`Ошибка при скачивании файла: ${response.statusText}`);
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = downloadUrl;
    link.download = name + '.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
};
