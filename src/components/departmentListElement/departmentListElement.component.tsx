import { IDepartment } from '../../types/departments.ts';
import { Link } from 'react-router-dom';
import css from './departmentListElement.module.css';

interface IDepartmentListElementProps {
    department: IDepartment;
}

export const DepartmentListElementComponent = ({
    department,
}: IDepartmentListElementProps) => {
    return (
        <Link
            to={`/department/${department.id}`}
            className={css.link}
            key={department.id}
        >
            <div className={css.departmentElement}>{department.name}</div>
        </Link>
    );
};
