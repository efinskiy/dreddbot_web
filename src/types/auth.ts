export interface AuthData {
    isLoggedIn: boolean;
    user_id: number | undefined;
    name: string | undefined;
    valid_until: number;
    access_token: string | undefined;
    permissions: string[];
}

export interface AuthResponse200 {
    access_token: string;
    expires: number;
}

export interface IAuthResponse400 {
    detail: string;
}
