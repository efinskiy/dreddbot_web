import css from './navigationMenu.module.css';
import classNames from 'classnames';
import { useAuthState } from '../../stores/auth.store.ts';
import { useEffect, useRef, useState } from 'react';
import { useSystemStore } from '../../stores/system.store.ts';
import { PermissionRequiredComponent } from '../permissionRequired/permissionRequired.component.tsx';
import { NavigationPopupComponent } from '../navigationPopup/navigationPopup.component.tsx';
import { CiMenuBurger } from 'react-icons/ci';

export const HeaderComponent = () => {
    const useAuth = useAuthState();
    const [remainingSeconds, setRemainingSeconds] = useState<number>(
        useAuth.valid_until.value
    );
    const [menuPopup_isOpen, setMenuPopup_isOpen] = useState(false);
    const useSystem = useSystemStore();
    const anchor = useRef(null);
    const updateRemainingSeconds = () => {
        setRemainingSeconds(() => {
            const unix_now: number = Date.now() / 1000;
            return Math.floor(useAuth.valid_until.value - unix_now);
        });
    };
    useEffect(() => {
        const interval = setInterval(updateRemainingSeconds, 1000);
        return () => clearInterval(interval);
    }, []);

    const openMenu = () => {
        setMenuPopup_isOpen(true);
    };

    return (
        <div ref={anchor} className={classNames(css.header)}>
            <NavigationPopupComponent
                isOpen={menuPopup_isOpen}
                setOpen={setMenuPopup_isOpen}
            />
            {/*{useSystem.show_debug.get() ? (*/}
            {/*    <DebugInfo remaining={remainingSeconds} />*/}
            {/*) : null}*/}
            <div className={css.header_left}>
                <a className={css.header_logo_link} href="/">
                    <img
                        className={css.header_logo}
                        src="/logo_clear.png"
                        alt="logo"
                    />
                </a>
                <CiMenuBurger
                    onClick={() => openMenu()}
                    className={css.header_menu_button}
                />
            </div>
            <div className={css.header_right}>
                <div
                    className={classNames(
                        css.header_right_user_settings,
                        css.fc
                    )}
                >
                    <img
                        className={css.header_menu_button}
                        src="/icons/gear_icon.svg"
                        alt="settings"
                    />
                    {/*<img*/}
                    {/*    className={css.header_menu_button}*/}
                    {/*    src="/icons/UserIcon.svg"*/}
                    {/*    alt="user"*/}
                    {/*/>*/}
                </div>
                <div className={css.fc}>
                    <a className={css.button_wrapper} href="/logout">
                        <img
                            className={css.header_menu_button}
                            src="/icons/logout_icon.svg"
                            alt="settings"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};
