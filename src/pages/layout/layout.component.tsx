import css from './layout.module.css';
// import {Outlet} from "react-router-dom";
// import {NavigationComponent} from "../../components/navigation/navigation.component.tsx";
import {logout_user, useAuthState} from "../../stores/auth.store.ts";
import {Outlet, redirect, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useInterval} from "usehooks-ts";
import Cookies from "js-cookie";
import {NavigationMenuComponent} from "../../components/navigationMenu/navigationMenu.component.tsx";

export const Layout = () => {
    const authState = useAuthState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authState.isLoggedIn.value){
            navigate('/login')
        }
    }, [authState.isLoggedIn.value]);

    useInterval(()=>{
        const valid_until : number = Number(Cookies.get('vu'));
        const unix_now : number = Date.now() / 1000;
        if (valid_until<=unix_now || isNaN(valid_until)) {
            logout_user()
            redirect('../login');
        }
    }, 1000)

    return (
        <div className={css.main}>
            {<NavigationMenuComponent/>}
            {<Outlet/>}
        </div>
    )
}