import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';
import { UserAuthData } from '../../types/user.ts';
import { call_auth_user } from '../../api/auth.ts';
import { auth_user } from '../../stores/auth.store.ts';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import css from './login.module.css';
import { useEffect } from 'react';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';

export const Login = () => {
    const navigate = useNavigate();
    const useSystem = useSystemStore();
    const login_user = (user: UserAuthData) => {
        call_auth_user(user).then((r) => {
            auth_user(user, r.data);
            Cookies.set('at', r.data.access_token);
            Cookies.set('vu', r.data.expires.toString());
            updateCfData(r, useSystem);
            window.location.reload();
        });
    };

    useEffect(() => {
        const at = Cookies.get('at');
        const vu = Cookies.get('vu');
        if (at && vu) {
            navigate('/');
        }
    }, []);

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
                onAuthCallback={(user: UserAuthData) => login_user(user)}
                requestAccess={'write'}
            />
        </div>
    );
};
