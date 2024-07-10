import css from './backgroundless.module.css';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const BackgroundlessComponent = ({ children }: Props) => {
    return <div className={css.block}>{children}</div>;
};
