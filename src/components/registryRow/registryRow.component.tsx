import classNames from 'classnames';
import { Registry } from '../../types/registry.ts';
import css from '../registry/registry.module.css';
import React from 'react';
import { DeleteRegistry, DownloadRegistry } from '../../api/registries.ts';
import {
    ConfirmButton,
    DangerButton,
    YellowButton,
} from '../popupUI/popup.component.tsx';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { PermissionRequiredComponent } from '../permissionRequired/permissionRequired.component.tsx';

interface Props {
    registry: Registry;
    setRegistry: React.Dispatch<React.SetStateAction<Registry[]>>;
    updatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    updatePopupRegistry: React.Dispatch<
        React.SetStateAction<Registry | undefined>
    >;
}

export const RegistryRow = ({
    registry,
    updatePopupRegistry,
    updatePopupOpen,
    setRegistry,
}: Props) => {
    const useSystem = useSystemStore();

    const openUpdatePopup = () => {
        updatePopupRegistry(registry);
        updatePopupOpen(true);
    };

    const downloadRegistry = () => {
        DownloadRegistry(registry.id, registry.name);
    };

    const deleteRegistry = () => {
        DeleteRegistry(registry.id)
            .then((res) => {
                updateCfData(res, useSystem);
                setRegistry((prev) => prev.filter((v) => v.id !== registry.id));
                toast.success('Реестр удален.', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                    transition: Slide,
                    containerId: 'RegistryContainer',
                });
            })
            .catch((err) => {
                toast.success(`Произошла ошибка удаления: ${err}`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: 'light',
                    transition: Slide,
                    containerId: 'RegistryContainer',
                });
            });
    };

    return (
        <>
            <div className={classNames(css.table_row, css.table_row_header)}>
                <span className={css.table_small_field}>{registry.id}</span>
                <span className={css.table_long_field}>{registry.name}</span>
                <span className={css.table_long_field}>
                    {registry.department.name}
                </span>
                <span className={css.table_md_field}>{registry.for_date}</span>
                <div className={css.table_button_field}>
                    <ConfirmButton
                        title={'Скачать'}
                        onClick={() => downloadRegistry()}
                        useMargin={false}
                    />
                </div>
                <PermissionRequiredComponent permissions={['registry.write']}>
                    <div className={css.table_button_field}>
                        <YellowButton
                            title={'Обновить'}
                            onClick={() => openUpdatePopup()}
                            useMargin={false}
                        />
                    </div>
                </PermissionRequiredComponent>
                <PermissionRequiredComponent permissions={['registry.delete']}>
                    <div className={css.table_button_field}>
                        <DangerButton
                            title={'Удалить'}
                            onClick={() => deleteRegistry()}
                            useMargin={false}
                        />
                    </div>
                </PermissionRequiredComponent>
            </div>
        </>
    );
};
