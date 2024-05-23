import { Outlet } from 'react-router-dom';
import { DepartmentListComponent } from '../departmentList/departmentList.component.tsx';
import css from './departmentContent.module.css';

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
