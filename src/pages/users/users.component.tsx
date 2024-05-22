// import {Layout} from "../layout/layout.component.tsx";
import { NavigationComponent } from '../../components/navigation/navigation.component.tsx';
import css from './users.module.css';
import { Outlet } from 'react-router-dom';

export const UsersComponent = () => {
    return (
        <div className={css.block}>
            <NavigationComponent />
            <Outlet />
        </div>
    );
};
