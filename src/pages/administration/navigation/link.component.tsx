import { Link, useLocation } from 'react-router-dom';
import css from './link.module.css';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

interface Props {
    to: string;
    title: string;
}

export const LinkComponent = ({ to, title }: Props) => {
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        location.pathname == to ? setIsActive(true) : setIsActive(false);
    }, [location]);

    return (
        <div>
            <Link
                to={to}
                className={classNames(css.link, isActive ? css.active : null)}
            >
                {title}
            </Link>
        </div>
    );
};
