import { IManageable } from './manageable.ts';

export interface IUserAuthData {
    auth_date: number;
    first_name: string;
    last_name?: string | undefined;
    hash: string;
    id: number;
    photo_url?: string | undefined;
    username?: string | undefined;
}

export interface IUserInSearch {
    id: number;
    full_name: string;
    commentary: string | undefined;
    is_trusted: boolean;
    is_fired: boolean;
}

export interface IUser {
    id: number;
    telegram_id: number;
    telegram_username: string | undefined;
    full_name: string | undefined;
    has_web_access: boolean;
    is_trusted: boolean;
    marked_for_deletion: boolean;
    is_fired: boolean;
    commentary: string | undefined;
    user_picture: string | undefined;
    manageable_ref: IManageable[];
}

export interface IUserClear {
    id: number;
    telegram_id: number;
    telegram_username: string | undefined;
    full_name: string | undefined;
    has_web_access: boolean;
    is_trusted: boolean;
    marked_for_deletion: boolean;
    is_fired: boolean;
    commentary: string | undefined;
    user_picture: string | undefined;
}

export interface IUserClearWithPermissions extends IUserClear {
    permissions: Permission[];
}

export interface IUserUpdateBool {
    value: boolean;
}

export interface IUserUpdateString {
    value: string;
}

export interface IUserUpdateResponse {
    status: string;
}

interface Permission {
    id: number;
    key: string;
}
