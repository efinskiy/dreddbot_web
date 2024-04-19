import css from './layout.module.css';
// import {Outlet} from "react-router-dom";
import {NavigationComponent} from "../../components/navigation/navigation.component.tsx";
import {useAuthState} from "../../stores/auth.store.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";


export const Layout = () => {
    const authState = useAuthState();
    const navigate = useNavigate();
    useEffect(() => {
        if (!authState.isLoggedIn.value){
            navigate('/login')
        }
    }, [authState.isLoggedIn.value]);
    return (
        <div className={css.main}>
            {<NavigationComponent/>}
            {<Outlet/>}
        </div>
    )
}