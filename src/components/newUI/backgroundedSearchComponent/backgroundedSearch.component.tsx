import css from './backgroundedSearch.module.css';
import { CiSearch } from 'react-icons/ci';

interface Props {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const BackgroundedSearchComponent = ({
    placeholder,
    value,
    onChange,
}: Props) => {
    return (
        <div className={css.searchBlock}>
            <CiSearch className={css.searchIcon} />
            <input
                type="search"
                name="search"
                id="search"
                className={css.searchInput}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};
