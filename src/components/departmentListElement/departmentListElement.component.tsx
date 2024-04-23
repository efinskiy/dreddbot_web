import {IDepartment} from "../../types/departments.ts";
import css from './departmentListElement.module.css';
import {Link} from "react-router-dom";

interface IDepartmentListElementProps {
    department: IDepartment
}

export const DepartmentListElementComponent = ({department}: IDepartmentListElementProps) => {
    return (
        <Link to={`/department/${department.id}`} className={css.link} key={department.id}>
            <div className={css.departmentElement}>
                {department.name}
            </div>
        </Link>
    )
}