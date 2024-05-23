import Popup from 'reactjs-popup';
import React from 'react';
import css from '../../popupUI/popup.module.css';
import { Slide, ToastContainer } from 'react-toastify';
import { Registry } from '../../../types/registry.ts';
import {
    ConfirmButton,
    PopupBody,
    PopupContent,
    PopupField,
    PopupFooter,
    PopupHeader,
} from '../../popupUI/popup.component.tsx';

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
    // const today = new Date(Date.now());
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

            <PopupBody>
                <PopupHeader
                    title={`Обновить реестр: ${selectedRegistry?.name}`}
                    setOpen={setOpen}
                />
                <PopupContent>
                    <PopupField>
                        <span className={css.info_field_item}>Дата:</span>
                        <input type="date" />
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>Excel файл:</span>
                        <input type="file" />
                    </PopupField>
                    <PopupFooter>
                        <ConfirmButton
                            title={'Обновить'}
                            useMargin={true}
                            onClick={() => console.log('asdad')}
                        />
                    </PopupFooter>
                </PopupContent>
            </PopupBody>
        </Popup>
    );
};

export const RegistryDeleteConfirmPopup = () => {
    return <></>;
};
