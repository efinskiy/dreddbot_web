import { IManageable } from '../../types/manageable.ts';
import { Link } from 'react-router-dom';
import css from './manageableItem.module.css';

interface IManageableItemComponent {
    manageable: IManageable;
}

export const ManageableItemComponent = ({
    manageable,
}: IManageableItemComponent) => {
    return (
        <Link to={`/manageable/${manageable.id}`} className={css.link}>
            <div className={css.item}>
                <span className={css.title}>{manageable.title}</span>
            </div>
        </Link>
    );
};
