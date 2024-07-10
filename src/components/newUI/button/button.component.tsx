import css from './button.module.css';
import classNames from 'classnames';

interface Props {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler;
    type?: 'green' | 'gray' | 'red';
    size?: 'fill' | 'stretch';
}

export const Button = ({ children, onClick, type, size }: Props) => {
    return (
        <button
            className={classNames(
                css.button,
                type == 'green'
                    ? css.green
                    : type == 'gray'
                    ? css.gray
                    : type == 'red'
                    ? css.red
                    : css.green,
                size == 'fill' ? css.fill : css.stretch
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
