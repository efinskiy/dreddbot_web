import css from './popup.module.css';
import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface HeaderProps {
    title: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BodyProps {
    children: ReactNode;
}

interface ButtonProps {
    title: string;
    onClick: () => void;
    useMargin: boolean;
}

export const PopupHeader = ({ title, setOpen }: HeaderProps) => {
    return (
        <div className={css.header}>
            <h3>{title}</h3>
            <a className={css.close} onClick={() => setOpen(false)}>
                &#10005;
            </a>
        </div>
    );
};

export const PopupBody = ({ children }: BodyProps) => {
    return <div className={css.popup}>{children}</div>;
};

export const PopupContent = ({ children }: BodyProps) => {
    return <div className={css.content}>{children}</div>;
};

export const PopupField = ({ children }: BodyProps) => {
    return <div className={css.field}>{children}</div>;
};

export const PopupFooter = ({ children }: BodyProps) => {
    return <div className={css.control_block}>{children}</div>;
};

export const ConfirmButton = ({ title, onClick, useMargin }: ButtonProps) => {
    return (
        <button
            className={classNames(
                css.button,
                css.confirm_button,
                useMargin ? css.button_margin : null
            )}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export const YellowButton = ({ title, onClick, useMargin }: ButtonProps) => {
    return (
        <button
            className={classNames(
                css.button,
                css.yellow_button,
                useMargin ? css.button_margin : null
            )}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export const DangerButton = ({ title, onClick, useMargin }: ButtonProps) => {
    return (
        <button
            className={classNames(
                css.button,
                css.danger_button,
                useMargin ? css.button_margin : null
            )}
            onClick={onClick}
        >
            {title}
        </button>
    );
};
