import Popup from 'reactjs-popup';
import css from './createDepartmentPopup.module.css';
import './createDepartmentPopup.module.css';

interface PopupProps {
    isOpen: boolean;
    setOpen: (x: boolean) => void;
}

export const CreateDepartmentPopup = ({ isOpen, setOpen }: PopupProps) => {
    const onClose = () => setOpen(false);
    return (
        <Popup open={isOpen} closeOnDocumentClick onClose={onClose}>
            <div className={css.popup}>
                <div className={css.header}>
                    <h3>Создать отдел.</h3>
                    <a className={css.close} onClick={onClose}>
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
