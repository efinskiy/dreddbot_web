import classNames from 'classnames';
import css from '../registry/registry.module.css';
import { IRegistry } from '../../types/registry.ts';

interface Props {
    registry: IRegistry;
}

export const RegistryRow = ({ registry }: Props) => {
    return (
        <div className={classNames(css.table_row, css.table_row_header)}>
            <span className={css.table_small_field}>{registry.id}</span>
            <span className={css.table_long_field}>{registry.name}</span>
            <span className={css.table_long_field}>
                {registry.department.name}
            </span>
            <span className={css.table_md_field}>{registry.for_date}</span>
            <span className={css.table_button_field}>
                <button>Обновить</button>
            </span>
            <span className={css.table_button_field}>
                <button>Удалить</button>
            </span>
        </div>
    );
};
