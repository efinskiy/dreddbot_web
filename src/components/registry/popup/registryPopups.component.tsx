import Popup from 'reactjs-popup';
import React from 'react';
import css from '../../departmentList/createDepartmentPopup/createDepartmentPopup.module.css';
import { Slide, ToastContainer } from 'react-toastify';
import { Registry } from '../../../types/registry.ts';

interface UpdateProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRegistry?: Registry;
}

export const RegistryUpdatePopup = ({
    isOpen,
    setOpen,
    selectedRegistry,
}: UpdateProps) => {
    if (!selectedRegistry) {
        return null;
    }
    const today = new Date(Date.now());
    return (
        <Popup
            open={isOpen}
            closeOnDocumentClick
            onClose={() => setOpen(false)}
        >
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
            />
            <div className={css.popup}>
                <div className={css.header}>
                    <h3>Обновить реестр: {selectedRegistry?.name}</h3>
                    <a className={css.close} onClick={() => setOpen(false)}>
                        &#10005;
                    </a>
                </div>
                <div className={css.content}>
                    <div className={css.field}>
                        <span className={css.info_field_item}>Дата:</span>
                        <input
                            type="date"
                            // min={
                            //     String(today.getFullYear()) +
                            //     '-' +
                            //     (String(today.getUTCMonth() + 1).length == 2
                            //         ? String(today.getUTCMonth() + 1)
                            //         : String(today.getUTCMonth() + 1)) +
                            //     '-' +
                            //     String(today.getDate())
                            // }
                        />
                    </div>
                    <div className={css.field}>
                        <span className={css.info_field_item}>Excel файл:</span>
                        <input type="file" />
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export const RegistryDeleteConfirmPopup = () => {
    return <></>;
};
