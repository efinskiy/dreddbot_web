import {IUserClear} from "./user.ts";
import {IManageable} from "./manageable.ts";

export interface IDepartment{
    id: number
    name: string
}

export interface IDepartmentWithUsers{
    id: number
    name: string
    users: IUserClear[]
}

export interface IDepartmentWithManageables{
    id: number
    name: string
    manageables: IManageable[]
}