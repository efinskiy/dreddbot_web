import { SearchInputComponent } from '../search-input/search-input.component.tsx';
import css from './search-block.module.css';

export const SearchBlockComponent = () => {
    return (
        <div className={css.block}>
            <h3 className={css.title}>Пользователи</h3>
            {<SearchInputComponent />}
        </div>
    );
};
