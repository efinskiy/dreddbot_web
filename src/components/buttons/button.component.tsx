import classNames from 'classnames';
import css from './button.module.css';

interface IButton {
    title: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const Button = ({ title, onClick, disabled }: IButton) => {
    return (
        <button
            onClick={onClick}
            className={classNames(css.red, css.button)}
            disabled={!!disabled}
        >
            {title}
        </button>
    );
};
