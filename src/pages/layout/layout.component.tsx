import css from './layout.module.css';
// import {Outlet} from "react-router-dom";
// import {NavigationComponent} from "../../components/navigation/navigation.component.tsx";
import {logout_user, useAuthState} from "../../stores/auth.store.ts";
import {Outlet, redirect, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {NavigationMenuComponent} from "../../components/navigationMenu/navigationMenu.component.tsx";
import {get_me} from "../../api/auth.ts";
import {updateCfData} from "../../utils/debug.ts";
import {useSystemStore} from "../../stores/system.store.ts";

export const Layout = () => {
    const authState = useAuthState();
    const navigate = useNavigate();
    const useSystem = useSystemStore()

    useEffect(() => {
        if (!authState.isLoggedIn.value){
            navigate('/login')
        }
        get_me().then(d => {
            authState.set({
                isLoggedIn: true,
                user_id: d.data.id,
                name: `${d.data.full_name} | ${d.data.commentary}`,
                valid_until: Number(Cookies.get('vu')),
                access_token: Cookies.get('at'),
                permissions: d.data.permissions.map(p => p.key)
            })
            updateCfData(d, useSystem)
        })
    }, [authState.isLoggedIn.value]);

    useEffect(() => {
        const interval = setInterval(()=> {
            const valid_until : number = Number(Cookies.get('vu'));
            const unix_now : number = Date.now() / 1000;
            if (valid_until<=unix_now || isNaN(valid_until)) {
                logout_user()
                redirect('../login');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className={css.main}>
            {<NavigationMenuComponent/>}
            {<Outlet/>}
        </div>
    )
}