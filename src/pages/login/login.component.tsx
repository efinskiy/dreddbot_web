import { TLoginButton, TLoginButtonSize } from 'react-telegram-auth';
import { UserAuthData } from '../../types/user.ts';
import { call_auth_user, get_me } from '../../api/auth.ts';
import { auth_user, useAuthState } from '../../stores/auth.store.ts';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import css from './login.module.css';
import { useEffect } from 'react';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { Slide, toast } from 'react-toastify';
import { toast_error, toast_success } from '../../utils/toaster.ts';

export const Login = () => {
    const navigate = useNavigate();
    const useSystem = useSystemStore();
    const authState = useAuthState();
    const login_user = (user: UserAuthData) => {
        call_auth_user(user)
            .then((r) => {
                auth_user(user, r.data);
                Cookies.set('at', r.data.access_token);
                Cookies.set('vu', r.data.expires.toString());
                updateCfData(r, useSystem);
                // window.location.reload();
            })
            .then(() => {
                get_me()
                    .then((d) => {
                        authState.set({
                            isLoggedIn: true,
                            user_id: d.data.id,
                            name: d.data.commentary,
                            valid_until: Number(Cookies.get('vu')),
                            access_token: Cookies.get('at'),
                            permissions: d.data.permissions.map((p) => p.key),
                        });
                    })
                    .then(() => {
                        welcome_user();
                    })
                    .then(() => {
                        navigate('/user');
                    });
            })
            .catch((err) => {
                catch_auth_error(err);
            });
    };

    const welcome_user = () => {
        const state = authState.get();
        toast_success(`${state.name}, добро пожаловать!`);
    };

    const catch_auth_error = (err: string) => {
        if (err == 'AxiosError: Request failed with status code 401') {
            toast_error('`Вход невозможен. Недостаточно прав.');
        }
    };
    useEffect(() => {
        const at = Cookies.get('at');
        const vu = Cookies.get('vu');
        if (at && vu) {
            navigate('/user');
        }
    }, []);

    const login_by_creds = () => {
        toast.error(`Вход по Логину/паролю временно недоступен.`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'light',
            transition: Slide,
            containerId: 'toaster',
        });
    };

    return (
        <div className={css.login}>
            <div className={css.login_form}>
                <a href="https://celfin.ru">
                    <img
                        src="./logo_clear.png"
                        alt="logo"
                        className={css.login_logo}
                    />
                </a>
                <div className={css.login_form_content}>
                    <h1 className={css.login_form_title}></h1>
                    <p className={css.login_form_title}>
                        Войти с помощью Celfin ID
                    </p>
                    <div className={css.lp_form}>
                        <div className={css.lp_form_wrapper}>
                            <div className={css.lp_form_login}>
                                <label htmlFor="login">Логин</label>
                                <input
                                    type="text"
                                    required={true}
                                    name={'login'}
                                />

                                <label htmlFor="password">Пароль</label>
                                <input
                                    type="password"
                                    required={true}
                                    name={'password'}
                                />

                                <div className={css.login_form_spacer}></div>

                                <button
                                    className={css.login_form_authbutton}
                                    onClick={() => login_by_creds()}
                                >
                                    {' '}
                                    Войти
                                </button>

                                <div className={css.separator}>или</div>
                                <div>
                                    <TLoginButton
                                        // botName="cfdredd_bot"
                                        botName="dredddev_bot"
                                        buttonSize={TLoginButtonSize.Large}
                                        lang="ru"
                                        usePic={true}
                                        cornerRadius={20}
                                        onAuthCallback={(user: UserAuthData) =>
                                            login_user(user)
                                        }
                                        requestAccess={'write'}
                                        additionalClassNames={
                                            css.tg_login_custom_css
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.login_bg}></div>
        </div>
    );
};
