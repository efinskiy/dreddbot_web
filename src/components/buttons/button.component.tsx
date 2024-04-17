import classNames from "classnames";

interface IButton {
    title: string,
    onClick?: () => void;
    disabled?: boolean;
}

import css from './button.module.css';

export const Button = ({title, onClick, disabled}: IButton) => {
    return (
        <button onClick={onClick} className={classNames(css.red)} disabled={!!disabled}>
            {title}
        </button>
    )
}