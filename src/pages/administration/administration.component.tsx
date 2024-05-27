import { useEffect, useState } from 'react';
import {
    getUsers,
    getPermissionsAll,
    permissionsAssignArg,
    permissionsRevork,
    permissionsAssign,
} from '../../api/permissions';
import { PermissionsUser, Permissions } from '../../types/permissions.ts';
import { User } from './user/user.component.tsx';
import css from './administration.module.css';
import { PermissionsHeader } from './permisions/permisions.component.tsx';

export const AdministrationComponent = () => {
    const [users, setUsers] = useState<PermissionsUser[]>([]);
    const [permissions, setPermissions] = useState<Permissions[]>([]);

    useEffect(() => {
        getUsers(setUsers);
        getPermissionsAll(setPermissions);
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    const onClick = (data: permissionsAssignArg) => (state: boolean) => {
        if (state) {
            console.log('Revork');
            permissionsRevork(data);
        } else {
            console.log('Assign');
            permissionsAssign(data);
        }
    };

    return (
        <div className={css.wrap}>
            <h3>Раздел администрирования</h3>
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
