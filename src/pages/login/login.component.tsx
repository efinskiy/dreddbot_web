import {TLoginButton, TLoginButtonSize} from "react-telegram-auth";
import {IUserAuthData} from "../../types/user.ts";
import {call_auth_user} from "../../api/auth.ts";
import {auth_user} from "../../stores/auth.store.ts";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import css from './login.module.css';


export const Login = () => {
    const navigate = useNavigate();

    const login_user = (user: IUserAuthData) => {
        call_auth_user(user).then(
            (r) => {
                auth_user(user, r);
                Cookies.set('at', r.access_token);
                Cookies.set('vu', r.expires.toString());
                navigate('/')
            });
    }


    return (
        <div className={css.login}>
            <h1 className={css.title}>Login</h1>
            <h2 className={css.subtitle}>Judge Web Interface</h2>
            <TLoginButton
                botName="cfdredd_bot"
                buttonSize={TLoginButtonSize.Large}
                lang="ru"
                usePic={true}
                cornerRadius={20}
                onAuthCallback={(user: IUserAuthData) => login_user(user)}
                requestAccess={'write'}
            />
        </div>
    )
}