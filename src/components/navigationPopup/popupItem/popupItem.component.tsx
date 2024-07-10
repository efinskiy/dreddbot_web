import css from '../navigationPopup.module.css';
import { Link } from 'react-router-dom';
import { SiGrafana } from 'react-icons/si';
import { IconType } from 'react-icons';

interface PopupItemProps {
    title: string;
    Icon: IconType;
    link: string;
}

export const PopupItemComponent = ({ title, Icon, link }: PopupItemProps) => {
    return (
        <Link className={css.popup_item} to={link}>
            {/*<img src={icon} alt={title} />*/}
            <Icon />
            <span>{title}</span>
        </Link>
    );
};
