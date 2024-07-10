import { Manageable } from './manageable.ts';

export interface UserAuthData {
    auth_date: number;
    first_name: string;
    last_name?: string | undefined;
    hash: string;
    id: number;
    photo_url?: string | undefined;
    username?: string | undefined;
}

export interface UserInSearch {
    id: number;
    full_name: string;
    commentary: string | undefined;
    is_trusted: boolean;
    is_fired: boolean;
    has_web_access: boolean;
}

export interface PaginatedSearch {
    count: number;
    offset: number;
    result: UserInSearch[];
    total: number;
}

export interface User {
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
    manageable_ref: Manageable[];
}

export interface UserClear {
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

export interface UserClearWithPermissions extends UserClear {
    permissions: Permission[];
}

export interface UserUpdateBool {
    value: boolean;
}

export interface UserUpdateString {
    value: string;
}

export interface UserUpdateResponse {
    status: string;
}

interface Permission {
    id: number;
    key: string;
}
