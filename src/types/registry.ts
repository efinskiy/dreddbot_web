import { Department } from './departments.ts';
import { UserClear } from './user.ts';

export interface Registry {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    for_date: string;
    department: Department;
    user: UserClear;
}
