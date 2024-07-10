import css from './indicator.module.css';
import classNames from 'classnames';

interface IndicatorProps {
    color: 'red' | 'yellow' | 'gray' | 'green' | 'blue';
    text: string;
    width: 'stretch' | 'fill';
}

export const Indicator = ({ color, text, width }: IndicatorProps) => {
    const colorClass =
        color == 'red'
            ? css.red
            : color == 'yellow'
            ? css.red
            : color == 'gray'
            ? css.red
            : color == 'green'
            ? css.green
            : color == 'blue'
            ? css.red
            : css.red;
    const widthClass = width == 'fill' ? css.fill : css.stretch;

    return (
        <div className={classNames(css.indicator, colorClass, widthClass)}>
            <span>{text}</span>
        </div>
    );
};
