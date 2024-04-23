import css from './navigationMenuElement.module.css'
import 'material-icons/iconfont/material-icons.css';
import classNames from "classnames";
import {Link} from "react-router-dom";

export interface INavMenuElementProps {
    icon: string
    title: string
    link: string
}

export const NavigationMenuElementComponent = ({icon, title, link}: INavMenuElementProps) => {
    return (
        <Link to={link} title={title} className={css.link}>
            <div className={classNames(css.element)}>
                <span className={classNames('material-icons-outlined', css.element_icon)}>
                {icon}
                </span>
                <span className={css.element_title}>{title}</span>
            </div>
        </Link>
    )
}