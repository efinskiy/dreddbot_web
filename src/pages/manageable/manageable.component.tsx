import { ManageableNavigationComponent } from '../../components/manageableNavigation/manageableNavigation.component.tsx';
import { Outlet } from 'react-router-dom';
import css from './manabeable.module.css';

export const ManageableComponent = () => {
    return (
        <div className={css.block}>
            <ManageableNavigationComponent />
            <Outlet />
        </div>
    );
};
