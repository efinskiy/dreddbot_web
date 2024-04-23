import css from './department.module.css'
import {DepartmentNavigationComponent} from "../../components/departmentNavigation/departmentNavigation.component.tsx";
import {DepartmentContentComponent} from "../../components/departmentContent/departmentContent.component.tsx";

export const DepartmentComponent = () => {
    return (
        <div className={css.department}>
            <DepartmentNavigationComponent/>
            <DepartmentContentComponent/>
        </div>
    )
}