import { Link } from 'react-router-dom';
import css from './search-item.module.css';

export interface ISearchItemComponent {
    id: number;
    tg_name: string | undefined;
    commentary: string | undefined;
}

export const SearchItemComponent = ({
    id,
    tg_name,
    commentary,
}: ISearchItemComponent) => {
    return (
        <Link to={`/user/${id}`} className={css.link}>
            <div className={css.item}>
                <span className={css.tg_name}>{tg_name}</span>
                <span className={css.commentary}>{commentary}</span>
            </div>
        </Link>
    );
};
