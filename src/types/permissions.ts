export interface Permissions {
    id: number;
    key: string;
}

export interface PermissionsUser {
    id: number;
    telegram_id: number;
    telegram_username: string;
    full_name: string;
    has_web_access: boolean;
    is_trusted: boolean;
    marked_for_deletion: boolean;
    is_fired: boolean;
    commentary: string;
    user_picture: string;
    permissions: ReadonlyArray<Permissions>;
}

export interface Permission {
    id: number;
    key: string;
}
