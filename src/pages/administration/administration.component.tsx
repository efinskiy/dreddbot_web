import css from './administration.module.css';
import { Outlet } from 'react-router-dom';
import { NavigationComponent } from './navigation/navigation.component.tsx';

export const AdministrationComponent = () => {
    return (
        <div className={css.component}>
            <div className={css.title}>
                <h3 className={css.title_text}>Раздел администрирования</h3>
            </div>
            <div className={css.navigation}>
                <NavigationComponent />
            </div>
            <Outlet />
        </div>
    );
};
