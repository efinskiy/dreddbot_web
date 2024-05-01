import {Link} from "react-router-dom";
import css from './manageableLink.module.css'

interface IManageableLink {
    link: string
    title: string
}

export const ManageableLink = ({link, title}: IManageableLink) => {
    return (
        <Link to={link} className={css.link}>
        <div className={css.item}>
            {title}
        </div>
        </Link>
    )
}