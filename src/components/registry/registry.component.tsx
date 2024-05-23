import css from './registry.module.css';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { Registry } from '../../types/registry.ts';
import { GetAllRegistries } from '../../api/registries.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { RegistryRow } from '../registryRow/registryRow.component.tsx';
import {
    // RegistryDeleteConfirmPopup,
    RegistryUpdatePopup,
} from './popup/registryPopups.component.tsx';

const RegistryRowHeader = () => {
    return (
        <div className={classNames(css.table_row, css.table_row_header)}>
            <span className={css.table_small_field}>№</span>
            <span className={css.table_long_field}>Название</span>
            <span className={css.table_long_field}>Отдел</span>
            <span className={css.table_md_field}>Дата</span>
            <span className={css.table_button_field}>Скачать</span>
            <span className={css.table_button_field}>Обновить</span>
            <span className={css.table_button_field}>Удалить</span>
        </div>
    );
};

export const RegistryComponent = () => {
    const [registries, setRegistries] = useState<Registry[]>([]);
    const useSystem = useSystemStore();
    const [updatePopupOpen, setUpdatePopupOpen] = useState<boolean>(false);
    const [updatePopupRegistry, setUpdatePopupRegistry] = useState<
        Registry | undefined
    >();

    // const [deletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);

    useEffect(() => {
        GetAllRegistries().then((d) => {
            setRegistries(d.data);
            updateCfData(d, useSystem);
        });
    }, [useSystem]);

    return (
        <>
            <RegistryUpdatePopup
                isOpen={updatePopupOpen}
                setOpen={setUpdatePopupOpen}
                selectedRegistry={updatePopupRegistry}
            />
            {/*<RegistryDeleteConfirmPopup />*/}
            <div className={css.component}>
                <div className={css.navigation}>
                    <h3 className={css.navigation_title}>Реестры.</h3>
                    <button className={css.create_button}>Создать</button>
                </div>

                <div className={css.registries_table}>
                    <RegistryRowHeader />
                    {registries.map((r) => (
                        <RegistryRow
                            registry={r}
                            key={r.id}
                            updatePopupRegistry={setUpdatePopupRegistry}
                            updatePopupOpen={setUpdatePopupOpen}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
