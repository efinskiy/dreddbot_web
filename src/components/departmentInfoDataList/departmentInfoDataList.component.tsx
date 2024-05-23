import css from './departmentInfoDataList.module.css';
import { Button } from '../buttons/button.component.tsx';
import { UserClear } from '../../types/user.ts';
import { Manageable } from '../../types/manageable.ts';
import { DepartmentInfoDataListManageableElement } from '../departmentInfoDataListElement/elementManageable.component.tsx';
import { DepartmentInfoDataListUserElement } from '../departmentInfoDataListElement/elementUser.component.tsx';
import { useNavigate } from 'react-router-dom';

interface IDepartmentInfoDataListProps {
    title: string;
    dep_id: number;
    type: string;
    users?: UserClear[];
    manageables?: Manageable[];
}

export const DepartmentInfoDataListComponent = ({
    title,
    type,
    users,
    manageables,
    dep_id,
}: IDepartmentInfoDataListProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const navigate = useNavigate();
    return (
        <div className={css.dataContainer}>
            <div className={css.title}>
                <span>{title}</span>
                <Button
                    title={'Редактировать'}
                    onClick={() => navigate(`/department/${dep_id}/${type}`)}
                />
            </div>
            <div className={css.elements}>
                {type === 'users' ? (
                    users?.map((o: UserClear) => (
                        <DepartmentInfoDataListUserElement obj={o} key={o.id} />
                    ))
                ) : type === 'manageables' ? (
                    manageables?.map((o: Manageable) => (
                        <DepartmentInfoDataListManageableElement
                            obj={o}
                            key={o.id}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};
