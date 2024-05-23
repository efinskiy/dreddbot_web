import { UserClear } from './user.ts';
import { Manageable } from './manageable.ts';

export interface Department {
    id: number;
    name: string;
}

export interface DepartmentWithUsers {
    id: number;
    name: string;
    users: UserClear[];
}

export interface DepartmentWithManageables {
    id: number;
    name: string;
    manageables: Manageable[];
}
