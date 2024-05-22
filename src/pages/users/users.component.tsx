import { NavigationComponent } from '../../components/navigation/navigation.component.tsx';
import { Outlet } from 'react-router-dom';
import css from './users.module.css';

export const UsersComponent = () => {
    return (
        <div className={css.block}>
            <NavigationComponent />
            <Outlet />
        </div>
    );
};
