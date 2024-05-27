import Popup from 'reactjs-popup';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { CreateRegistry, UpdateRegistry } from '../../../api/registries.ts';
import { updateCfData } from '../../../utils/debug.ts';
import { useSystemStore } from '../../../stores/system.store.ts';
import { GetAllDepartments } from '../../../api/departments.ts';

interface UpdateProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRegistry?: Registry;
}

interface NewRegistryProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    registrySet: React.Dispatch<React.SetStateAction<Registry[]>>;
}

interface DepartmentInSelect {
    id: number;
    title: string;
}

export const RegistryNewPopup = ({
    isOpen,
    setOpen,
    registrySet,
}: NewRegistryProps) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [departmentId, setDepartmentId] = useState('0');
    const [file, setFile] = useState<File | null>(null);
    const [departments, setDepartments] = useState<DepartmentInSelect[]>([
        { id: 0, title: 'Отдел' },
    ]);
    const useSystem = useSystemStore();

    useEffect(() => {
        GetAllDepartments().then((d) =>
            setDepartments([
                { id: 0, title: 'Выбор отдела' },
                ...d.data.map((dep) => ({ id: dep.id, title: dep.name })),
            ])
        );
    }, []);

    const handleCreateButton = () => {
        if (file && departmentId && date && title) {
            CreateRegistry(file, title, date, departmentId)
                .then((res) => {
                    updateCfData(res, useSystem);
                    registrySet((prev) => [...prev, res.data]);
                    toast.success('Реестр добавлен.', {
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
                    toast.error(`Ошибка: ${res}`, {
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
                });
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dt = e.target.value;
        // const formattedString = '';
        const formattedString = new Date(Date.parse(dt)).toLocaleDateString(
            'ru-RU'
        );
        setDate(formattedString);
    };

    const handleDepartmentChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDepartmentId(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

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
                <PopupHeader title={'Новый реестр'} setOpen={setOpen} />
                <PopupContent>
                    <PopupField>
                        <span className={css.info_field_item}>
                            Название реестра:
                        </span>
                        <input
                            type="text"
                            className={css.field_input}
                            onChange={(e) => handleTitleChange(e)}
                            value={title}
                        />
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>
                            Дата реестра:
                        </span>
                        <input
                            type="date"
                            className={css.field_input}
                            onChange={(e) => handleDateChange(e)}
                        />
                    </PopupField>
                    <PopupField>
                        <span className={css.info_field_item}>Отдел:</span>
                        <select
                            defaultValue={'0'}
                            className={css.field_input}
                            onChange={(e) => handleDepartmentChange(e)}
                        >
                            <option value="0" id={'0'} disabled={true}>
                                Выбор отдела
                            </option>
                            {departments.map((d) =>
                                d.id != 0 ? (
                                    <option value={d.id} id={d.id.toString()}>
                                        {d.title}
                                    </option>
                                ) : null
                            )}
                        </select>
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
                            title={'Создать'}
                            onClick={() => handleCreateButton()}
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
