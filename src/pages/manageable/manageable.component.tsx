import { ManageableSearchComponent } from '../../components/manageableNavigation/manageableSearchComponent.tsx';
import { Outlet } from 'react-router-dom';
import css from './manabeable.module.css';

export const ManageableComponent = () => {
    return (
        <div className={css.block}>
            <ManageableSearchComponent />
            {/*<Outlet />*/}
        </div>
    );
};
