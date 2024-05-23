import css from './navigationMenu.module.css';
import { NavigationMenuElementComponent } from '../navigationMenuElement/navigationMenuElement.component.tsx';
import classNames from 'classnames';
import { useAuthState } from '../../stores/auth.store.ts';
import { useEffect, useState } from 'react';
import { DebugInfo } from '../debugInfo/debugInfo.component.tsx';
import { useSystemStore } from '../../stores/system.store.ts';
import { PermissionRequiredComponent } from '../permissionRequired/permissionRequired.component.tsx';
import { YellowButton } from '../popupUI/popup.component.tsx';

export const NavigationMenuComponent = () => {
    const useAuth = useAuthState();
    const [remainingSeconds, setRemainingSeconds] = useState<number>(
        useAuth.valid_until.value
    );
    const updateRemainingSeconds = () => {
        setRemainingSeconds(() => {
            const unix_now: number = Date.now() / 1000;
            return Math.floor(useAuth.valid_until.value - unix_now);
        });
    };
    const useSystem = useSystemStore();
    useEffect(() => {
        const interval = setInterval(updateRemainingSeconds, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classNames(css.menu, css.menu_space)}>
            {useSystem.show_debug.get() ? (
                <DebugInfo remaining={remainingSeconds} />
            ) : null}
            <div className={css.menu}>
                <div className={css.logo}></div>
                <PermissionRequiredComponent permissions={['user.read']}>
                    {
                        <NavigationMenuElementComponent
                            icon={'account_circle'}
                            title={'Пользователи'}
                            link={'/user'}
                        />
                    }
                </PermissionRequiredComponent>
                <PermissionRequiredComponent permissions={['manageable.read']}>
                    {
                        <NavigationMenuElementComponent
                            icon={'forum'}
                            title={'Чаты'}
                            link={'/manageable'}
                        />
                    }
                </PermissionRequiredComponent>
                <PermissionRequiredComponent permissions={['department.read']}>
                    {
                        <NavigationMenuElementComponent
                            icon={'group'}
                            title={'Отделы'}
                            link={'/department'}
                        />
                    }
                </PermissionRequiredComponent>
                <PermissionRequiredComponent permissions={['registry.read']}>
                    {
                        <NavigationMenuElementComponent
                            icon={'pending_actions'}
                            title={'Реестры'}
                            link={'/registries'}
                        />
                    }
                </PermissionRequiredComponent>
                {/*{<NavigationMenuElementComponent icon={'manage_accounts'} title={}/>}*/}
            </div>
            <div className={css.menu}>
                <PermissionRequiredComponent permissions={['admin.access']}>
                    <YellowButton
                        title={'Debug'}
                        onClick={() =>
                            useSystem.show_debug.set(
                                !useSystem.show_debug.get()
                            )
                        }
                        useMargin={false}
                    />
                    {
                        <NavigationMenuElementComponent
                            icon={'admin_panel_settings'}
                            title={'Администрирование'}
                            link={'/administration'}
                        />
                    }
                </PermissionRequiredComponent>
            </div>
        </div>
    );
};
