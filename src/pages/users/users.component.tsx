import { UserSearchComponent } from '../../components/newUI/userSearch/userSearch.component.tsx';
import { Outlet } from 'react-router-dom';
import css from './users.module.css';

export const UsersComponent = () => {
    return (
        <div className={css.block}>
            <UserSearchComponent />
            <Outlet />
        </div>
    );
};
