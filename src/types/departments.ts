import {IUserClear} from "./user.ts";

export interface IDepartment{
    id: number
    name: string
}

export interface IDepartmentWithUsers{
    id: number
    name: string
    users: IUserClear[]
}