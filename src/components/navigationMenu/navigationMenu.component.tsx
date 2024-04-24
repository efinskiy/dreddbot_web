import css from './navigationMenu.module.css';
import {NavigationMenuElementComponent} from "../navigationMenuElement/navigationMenuElement.component.tsx";
import classNames from "classnames";


export const NavigationMenuComponent = () => {
    return (
        <div className={classNames(css.menu, css.menu_space)}>
            <div className={css.menu}>
                {<NavigationMenuElementComponent icon={'account_circle'} title={'Пользователи'} link={'/user'}/>}
                {<NavigationMenuElementComponent icon={'group'} title={'Отделы'} link={'/department'}/>}
                {/*{<NavigationMenuElementComponent icon={'manage_accounts'} title={}/>}*/}
                {<NavigationMenuElementComponent icon={'admin_panel_settings'} title={'Администрирование'} link={'/administration'}/>}
                {<NavigationMenuElementComponent icon={'forum'} title={'Чаты'} link={'/manageable'}/>}
            </div>
            <div className={css.menu}>
                {<NavigationMenuElementComponent icon={'admin_panel_settings'} title={'Я'} link={'/me'}/>}
            </div>
        </div>
    )
}