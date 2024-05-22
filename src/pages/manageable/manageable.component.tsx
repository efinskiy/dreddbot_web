import css from './manabeable.module.css';
import { ManageableNavigationComponent } from '../../components/manageableNavigation/manageableNavigation.component.tsx';
import { Outlet } from 'react-router-dom';

export const ManageableComponent = () => {
    return (
        <div className={css.block}>
            <ManageableNavigationComponent />
            <Outlet />
        </div>
    );
};
