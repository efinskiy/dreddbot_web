import { Outlet } from 'react-router-dom';
import css from './departmentContent.module.css';
import { DepartmentListComponent } from '../departmentList/departmentList.component.tsx';

export const DepartmentContentComponent = () => {
    return (
        <div className={css.content}>
            <Outlet />
            <div className={css.department_list}>
                <DepartmentListComponent />
            </div>
        </div>
    );
};
