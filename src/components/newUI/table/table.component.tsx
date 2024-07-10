import { ReactNode } from 'react';
import css from './table.module.css';

interface HeaderProps {
    titles: string[];
}

interface TableRowComponentProps {
    childs: React.ReactNode[];
}

export const TableHeaderComponent = ({ titles }: HeaderProps) => {
    return (
        <tr>
            {titles.map((title) => (
                <th>{title}</th>
            ))}
        </tr>
    );
};

export const TableRowComponent = ({ childs }: TableRowComponentProps) => {
    return (
        <tr>
            {childs.map((child) => (
                <td>{child}</td>
            ))}
        </tr>
    );
};

interface TableProps {
    children: ReactNode;
}

export const TableComponent = ({ children }: TableProps) => {
    return <table className={css.table}>{children}</table>;
};
