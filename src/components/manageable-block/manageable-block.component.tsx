import { Manageable } from '../../types/manageable.ts';
import { Button } from '../buttons/button.component.tsx';
import { kick_user } from '../../api/users.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import css from './manageable-block.module.css';
import { PermissionRequiredComponent } from '../permissionRequired/permissionRequired.component.tsx';

export interface IManageableBlockComponent {
    manageable: Manageable;
    user_id: number;
}

export const ManageableBlockComponent = ({
    manageable,
    user_id,
}: IManageableBlockComponent) => {
    const useSystem = useSystemStore();

    const kick = (id: number) => {
        kick_user(user_id, id).then((r) => {
            updateCfData(r, useSystem);

            r.status === 200 || r.data.status == 'kicked'
                ? alert(`Пользователь исключен из группы ${manageable.title}`)
                : alert('Произошла ошибка.');
        });
    };
    return (
        <div className={css.container}>
            <span className={css.title}>{manageable.title}</span>
            <PermissionRequiredComponent permissions={['users.kick']}>
                <Button
                    title={'Исключить'}
                    onClick={() => kick(manageable.id)}
                />
            </PermissionRequiredComponent>
        </div>
    );
};
