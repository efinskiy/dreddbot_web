import Popup from 'reactjs-popup';
import React, { ChangeEvent, useState } from 'react';
import css from '../../popupUI/popup.module.css';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Registry } from '../../../types/registry.ts';
import {
    ConfirmButton,
    PopupBody,
    PopupContent,
    PopupField,
    PopupFooter,
    PopupHeader,
} from '../../popupUI/popup.component.tsx';
import { UpdateRegistry } from '../../../api/registries.ts';
import { updateCfData } from '../../../utils/debug.ts';
import { useSystemStore } from '../../../stores/system.store.ts';

interface UpdateProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRegistry?: Registry;
}

interface NewRegistryProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegistryNewPopup = ({ isOpen, setOpen }: NewRegistryProps) => {
    return (
        <Popup
            open={isOpen}
            closeOnDocumentClick
            onClose={() => setOpen(false)}
        >
            <PopupBody>
                <PopupHeader title={'Новый реестр'} setOpen={setOpen} />
                <PopupContent>
                    <PopupField>
                        <span className={css.info_field_item}>
                            Название реестра:
                        </span>
                        <input type="text" className={css.field_input} />
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>
                            Дата реестра:
                        </span>
                        <input type="date" className={css.field_input} />
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>Отдел:</span>
                        <select defaultValue={'0'} className={css.field_input}>
                            <option value="0" disabled={true}>
                                Выбор отдела
                            </option>
                        </select>
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>Excel файл:</span>
                        <input
                            type="file"
                            accept={'.xlsx'}
                            onChange={(e) => {
                                e;
                            }}
                            className={css.field_input}
                        />
                    </PopupField>
                    <PopupFooter>
                        <ConfirmButton
                            title={'Создать'}
                            onClick={() => {}}
                            useMargin={true}
                        />
                    </PopupFooter>
                </PopupContent>
            </PopupBody>
        </Popup>
    );
};

export const RegistryUpdatePopup = ({
    isOpen,
    setOpen,
    selectedRegistry,
}: UpdateProps) => {
    const [newDate, setNewDate] = useState<string | undefined>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const useSystem = useSystemStore();

    if (!selectedRegistry) {
        return null;
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        const dt = e.target.value;
        // const formattedString = '';
        const formattedString = new Date(Date.parse(dt)).toLocaleDateString(
            'ru-RU'
        );
        setNewDate(formattedString);
    };

    const handleUpdateRegistry = () => {
        if (newDate && selectedFile && selectedRegistry) {
            UpdateRegistry(selectedRegistry.id, newDate, selectedFile)
                .then((res) => {
                    updateCfData(res, useSystem);
                    toast.success('Реестр обновлен.', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                        transition: Slide,
                    });
                })
                .catch((res) => {
                    toast.error('Произошла ошибка при обновлении реестра.', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: 'light',
                        transition: Slide,
                    });
                    console.log(res);
                });
        }
    };

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
                        <input
                            type="date"
                            onChange={(e) => handleDateChange(e)}
                            className={css.field_input}
                        />
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>Excel файл:</span>
                        <input
                            type="file"
                            accept={'.xlsx'}
                            onChange={(e) => handleFileChange(e)}
                            className={css.field_input}
                        />
                    </PopupField>
                    <PopupFooter>
                        <ConfirmButton
                            title={'Обновить'}
                            useMargin={true}
                            onClick={() => handleUpdateRegistry()}
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
