import { Manageable } from '../../types/manageable.ts';
import { Link } from 'react-router-dom';
import css from './departmentInfoDataListElement.module.css';

interface DepartmentInfoDataListManageableElement {
    obj: Manageable;
}

export const DepartmentInfoDataListManageableElement = ({
    obj,
}: DepartmentInfoDataListManageableElement) => {
    return (
        <Link to={`/manageable/${obj.id}`} className={css.link}>
            <div className={css.row}>{obj.title}</div>
        </Link>
    );
};
