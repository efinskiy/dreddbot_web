import { IUserClear } from '../../types/user.ts';
import { Link } from 'react-router-dom';
import css from './departmentInfoDataListElement.module.css';

interface DepartmentInfoDataListUserElement {
    obj: IUserClear;
}

export const DepartmentInfoDataListUserElement = ({
    obj,
}: DepartmentInfoDataListUserElement) => {
    return (
        <Link to={`/user/${obj.id}`} className={css.link}>
            <div className={css.row}>{obj.full_name}</div>
        </Link>
    );
};
