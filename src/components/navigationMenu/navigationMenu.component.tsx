import css from './navigationMenu.module.css';
import {NavigationMenuElementComponent} from "../navigationMenuElement/navigationMenuElement.component.tsx";
import classNames from "classnames";
import {useAuthState} from "../../stores/auth.store.ts";
import {useEffect, useState} from "react";
import {DebugInfo} from "../debugInfo/debugInfo.component.tsx";
import {useSystemStore} from "../../stores/system.store.ts";




export const NavigationMenuComponent = () => {
    const useAuth = useAuthState();
    const [remainingSeconds  , setRemainingSeconds   ] = useState<number>(useAuth.valid_until.value)
    const updateRemainingSeconds = () => {
        setRemainingSeconds(()=> {
            const unix_now : number = Date.now() / 1000;
            return Math.floor(useAuth.valid_until.value - unix_now)
        })
    }
    const useSystem = useSystemStore()
    useEffect(() => {
        const interval = setInterval(updateRemainingSeconds, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classNames(css.menu, css.menu_space)}>
            {useSystem.show_debug.get() ?
            <DebugInfo remaining={remainingSeconds}/>
            : null
            }
            <div className={css.menu}>
                <div className={css.logo}>
                </div>
                {<NavigationMenuElementComponent icon={'account_circle'} title={'Пользователи'} link={'/user'}/>}
                {<NavigationMenuElementComponent icon={'forum'} title={'Чаты'} link={'/manageable'}/>}
                {<NavigationMenuElementComponent icon={'group'} title={'Отделы'} link={'/department'}/>}
                {/*{<NavigationMenuElementComponent icon={'manage_accounts'} title={}/>}*/}
            </div>
            <div className={css.menu}>
                <button onClick={() => useSystem.show_debug.set(!useSystem.show_debug.get())}>debug</button>
                {<NavigationMenuElementComponent icon={'admin_panel_settings'} title={'Администрирование'}
                                                 link={'/administration'}/>}
                {/*{<NavigationMenuElementComponent icon={'admin_panel_settings'} title={'Я'} link={'/me'}/>}*/}
            </div>
        </div>
    )
}