import css from './registry.module.css';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Registry } from '../../types/registry.ts';
import { GetAllRegistries } from '../../api/registries.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { RegistryRow } from '../registryRow/registryRow.component.tsx';
import {
    RegistryNewPopup,
    // RegistryDeleteConfirmPopup,
    RegistryUpdatePopup,
} from './popup/registryPopups.component.tsx';
import { Slide, ToastContainer } from 'react-toastify';
import { PermissionRequiredComponent } from '../permissionRequired/permissionRequired.component.tsx';

const RegistryRowHeader = () => {
    return (
        <div className={classNames(css.table_row, css.table_row_header)}>
            <span className={css.table_small_field}>№</span>
            <span className={css.table_long_field}>Название</span>
            <span className={css.table_long_field}>Отдел</span>
            <span className={css.table_md_field}>Дата</span>
            <span className={css.table_button_field}>Скачать</span>
            <PermissionRequiredComponent permissions={['registry.write']}>
                <span className={css.table_button_field}>Обновить</span>
            </PermissionRequiredComponent>
            <PermissionRequiredComponent permissions={['registry.delete']}>
                <span className={css.table_button_field}>Удалить</span>
            </PermissionRequiredComponent>
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
    const [newRegistryPopupOpen, setNewRegistryPopupOpen] =
        useState<boolean>(false);

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
            <RegistryNewPopup
                isOpen={newRegistryPopupOpen}
                setOpen={setNewRegistryPopupOpen}
                registrySet={setRegistries}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
                transition={Slide}
                containerId={'RegistryContainer'}
            />
            {/*<RegistryDeleteConfirmPopup />*/}
            <div className={css.component}>
                <div className={css.navigation}>
                    <h3 className={css.navigation_title}>Реестры.</h3>
                    <PermissionRequiredComponent
                        permissions={['registry.write']}
                    >
                        <button
                            className={css.create_button}
                            onClick={() => setNewRegistryPopupOpen(true)}
                        >
                            Создать
                        </button>
                    </PermissionRequiredComponent>
                </div>

                <div className={css.registries_table}>
                    <RegistryRowHeader />
                    {registries.map((r) => (
                        <RegistryRow
                            registry={r}
                            setRegistry={setRegistries}
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
