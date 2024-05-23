import classNames from 'classnames';
import { Registry } from '../../types/registry.ts';
import css from '../registry/registry.module.css';
import React from 'react';
import { DownloadRegistry } from '../../api/registries.ts';
import {
    ConfirmButton,
    DangerButton,
    YellowButton,
} from '../popupUI/popup.component.tsx';
import { Button } from '../buttons/button.component.tsx';

interface Props {
    registry: Registry;
    updatePopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
    updatePopupRegistry: React.Dispatch<
        React.SetStateAction<Registry | undefined>
    >;
}

export const RegistryRow = ({
    registry,
    updatePopupRegistry,
    updatePopupOpen,
}: Props) => {
    const openUpdatePopup = () => {
        updatePopupRegistry(registry);
        updatePopupOpen(true);
    };

    const downloadRegistry = () => {
        DownloadRegistry(registry.id, registry.name);
    };

    return (
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
            <div className={css.table_button_field}>
                <YellowButton
                    title={'Обновить'}
                    onClick={() => openUpdatePopup()}
                    useMargin={false}
                />
            </div>
            <div className={css.table_button_field}>
                <DangerButton
                    title={'Удалить'}
                    onClick={() => null}
                    useMargin={false}
                />
            </div>
        </div>
    );
};
