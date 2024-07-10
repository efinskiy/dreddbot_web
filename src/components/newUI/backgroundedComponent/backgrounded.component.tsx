import { ReactNode } from 'react';
import css from './backgrounded.module.css';

interface Props {
    children: ReactNode;
}

export const BackgroundedComponent = ({ children }: Props) => {
    return <div className={css.backgrounded_component}>{children}</div>;
};
