import { useState } from 'react';
import { PermissionsUser } from '../../../types/permissions.ts';
import css from './user.module.css';
import { permissionsAssignArg } from '../../../api/permissions.ts';

interface UserProps {
    user: PermissionsUser;
    permissions: Array<number>;
    onClick: (p: permissionsAssignArg) => (state: boolean) => void;
}

export const User = ({ user, permissions, onClick }: UserProps) => {
    // const tmp = (p: number) => (state: boolean) => console.log(p, state);

    return (
        <div className={css.wrap}>
            <span className={css.name}>{user.commentary}</span>
            <div style={{ display: 'flex' }}>
                {permissions.map((p) => (
                    <InputControll
                        isCheckedInit={user.permissions
                            .map((el) => el.id)
                            .includes(p)}
                        // onClick={() => console.log(p)}
                        onClick={onClick({ perm_id: p, user_id: user.id })}
                    />
                ))}
            </div>
        </div>
    );
};

interface InputControllProps {
    isCheckedInit: boolean;
    onClick: (state: boolean) => void;
}

const InputControll = ({ isCheckedInit, onClick }: InputControllProps) => {
    const [isChecked, setIsChecked] = useState(isCheckedInit);

    return (
        <input
            type={'checkbox'}
            onClick={() => {
                setIsChecked((s) => !s);
                onClick(isChecked);
            }}
            className={css.input}
            checked={isChecked}
        />
    );
};
