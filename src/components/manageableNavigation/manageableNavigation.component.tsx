import css from './manageableNavigation.module.css';
import { useEffect, useState } from 'react';
import { GetAllManageables } from '../../api/manageables.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { useManageablesStore } from '../../stores/manageables.store.ts';
import { ManageableItemComponent } from '../manageableItem/manageableItem.component.tsx';
import { Manageable } from '../../types/manageable.ts';

export const ManageableNavigationComponent = () => {
    const useSystem = useSystemStore();
    const useManageables = useManageablesStore();
    const [filteredManageables, setFilteredManageables] = useState<
        Manageable[]
    >([]);
    const [filterInput, setFilterInput] = useState<string>('');

    useEffect(() => {
        GetAllManageables().then((d) => {
            updateCfData(d, useSystem);
            useManageables.set(d.data);
            setFilteredManageables(d.data);
        });
    }, []);

    useEffect(() => {
        setFilteredManageables(
            useManageables
                .get()
                .filter((manageable) =>
                    manageable.title
                        .toLowerCase()
                        .includes(filterInput.toLowerCase())
                )
        );
    }, [filterInput, useManageables]);

    return (
        <div className={css.navigation}>
            <div className={css.wrapper}>
                <div className={css.searchBlock}>
                    <h3 className={css.searchTitle}>Чаты</h3>
                    <input
                        className={css.searchInput}
                        type="text"
                        value={filterInput}
                        onChange={(e) => setFilterInput(e.target.value)}
                        placeholder={'Поисковая строка'}
                    />
                </div>
                <div className={css.items}>
                    {filteredManageables.map((o) => (
                        <ManageableItemComponent manageable={o} />
                    ))}
                </div>
            </div>
        </div>
    );
};
