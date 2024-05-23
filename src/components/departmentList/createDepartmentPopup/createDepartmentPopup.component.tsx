import Popup from 'reactjs-popup';
import React, { Dispatch, SetStateAction, useState } from 'react';
import css from './createDepartmentPopup.module.css';
import './createDepartmentPopup.module.css';
import { IDepartment } from '../../../types/departments.ts';
import { CreateDepartment } from '../../../api/departments.ts';
import { Slide, toast, ToastContainer } from 'react-toastify';

interface PopupProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDepartments: Dispatch<SetStateAction<IDepartment[]>>;
    departments: IDepartment[];
}

export const CreateDepartmentPopup = ({
    isOpen,
    setOpen,
    setDepartments,
    departments,
}: PopupProps) => {
    const [newDepartmentTitle, setNewDepartmentTitle] = useState<string>('');

    const sendRequest = async () => {
        CreateDepartment(newDepartmentTitle)
            .then((res) => {
                setDepartments([...departments, { ...res.data }]);
                toast.success('Запрос выполнен.', {
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
            .catch((reason) => {
                toast.error('Произошла ошибка при выполнении запроса', {
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
                console.error(reason);
            });
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
            <div className={css.popup}>
                <div className={css.header}>
                    <h3>Создать отдел.</h3>
                    <a className={css.close} onClick={() => setOpen(false)}>
                        &#10005;
                    </a>
                </div>
                <div className={css.content}>
                    <div className={css.field}>
                        <span>Название отдела</span>
                        <input
                            type="text"
                            value={newDepartmentTitle}
                            onChange={(e) =>
                                setNewDepartmentTitle(e.target.value)
                            }
                            className={css.field_input}
                        />
                    </div>
                </div>
                <div className={css.control_block}>
                    <button
                        className={css.confirm_button}
                        onClick={() => sendRequest()}
                    >
                        Создать
                    </button>
                </div>
            </div>
        </Popup>
    );
};
