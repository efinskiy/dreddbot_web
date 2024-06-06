import { PermissionsHeader } from '../permisions/permisions.component.tsx';
import css from '../administration.module.css';
import { User } from '../user/user.component.tsx';
import { useEffect, useState } from 'react';
import { Permissions, PermissionsUser } from '../../../types/permissions.ts';
import {
    getPermissionsAll,
    getUsers,
    permissionsAssign,
    permissionsAssignArg,
    permissionsRevork,
} from '../../../api/permissions.ts';

export const PermissionsComponent = () => {
    const [users, setUsers] = useState<PermissionsUser[]>([]);
    const [permissions, setPermissions] = useState<Permissions[]>([]);

    useEffect(() => {
        getUsers(setUsers);
        getPermissionsAll(setPermissions);
    }, []);

    const onClick = (data: permissionsAssignArg) => (state: boolean) => {
        if (state) {
            permissionsRevork(data);
        } else {
            permissionsAssign(data);
        }
    };

    return (
        <div className={css.mt2418}>
            <PermissionsHeader labels={permissions.map((l) => l.key)} />
            <div className={css.usersWrap}>
                {users.map((el) => (
                    <User
                        user={el}
                        permissions={permissions.map((l) => l.id)}
                        key={el.id}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    );
};
