import Popup from 'reactjs-popup';
import React from 'react';
import css from './createDepartmentPopup.module.css';
import './createDepartmentPopup.module.css';

interface PopupProps {
    isOpen: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateDepartmentPopup = ({ isOpen, setOpen }: PopupProps) => {
    return (
        <Popup
            open={isOpen}
            closeOnDocumentClick
            onClose={() => setOpen(false)}
        >
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
                        <input type="text" className={css.field_input} />
                    </div>
                </div>
                <div className={css.control_block}>
                    <button className={css.confirm_button}>Создать</button>
                </div>
            </div>
        </Popup>
    );
};
