import css from './layout.module.css';
import {Outlet} from "react-router-dom";
import {NavigationComponent} from "../../components/navigation/navigation.component.tsx";


export const Layout = () => {
    return (
        <div className={css.main}>
            {<NavigationComponent/>}
            {<Outlet/>}
        </div>
    )
}