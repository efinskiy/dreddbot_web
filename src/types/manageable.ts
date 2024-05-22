import { IUserClear } from './user.ts';
import { IDepartment } from './departments.ts';

export interface IManageable {
    id: number;
    telegram_id: number;
    title: string;
    is_chat: boolean;
    is_channel: boolean;
    active: boolean;
    is_trusted: boolean;
}

export interface IManageableSaturated {
    id: number;
    telegram_id: number;
    title: string;
    is_chat: boolean;
    is_channel: boolean;
    active: boolean;
    is_trusted: boolean;
    user_ref: IUserClear[];
    departments: IDepartment[];
}
