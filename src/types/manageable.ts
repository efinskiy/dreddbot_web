import { UserClear } from './user.ts';
import { Department } from './departments.ts';

export interface Manageable {
    id: number;
    telegram_id: number;
    title: string;
    is_chat: boolean;
    is_channel: boolean;
    active: boolean;
    is_trusted: boolean;
}

export interface ManageableSaturated {
    id: number;
    telegram_id: number;
    title: string;
    is_chat: boolean;
    is_channel: boolean;
    active: boolean;
    is_trusted: boolean;
    user_ref: UserClear[];
    departments: Department[];
}
