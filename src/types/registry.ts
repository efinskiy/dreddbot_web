import { IDepartment } from './departments.ts';
import { IUserClear } from './user.ts';

export interface IRegistry {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    for_date: string;
    department: IDepartment;
    user: IUserClear;
}
