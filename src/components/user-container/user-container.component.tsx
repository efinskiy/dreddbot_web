import css from './user-container.module.css';
import classNames from 'classnames';
import { Button } from '../buttons/button.component.tsx';
import { User } from '../../types/user.ts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    fire_user,
    get_user,
    grant_web_access,
    trust_user,
} from '../../api/users.ts';
import { ManageableBlockComponent } from '../manageable-block/manageable-block.component.tsx';
import { UserInputComponent } from '../user-input/user-input.component.tsx';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { routes } from '../../api/routes.ts';
import { PermissionRequiredComponent } from '../permissionRequired/permissionRequired.component.tsx';

export const UserContainerComponent = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const useSystem = useSystemStore();

    useEffect(() => {
        get_user(Number(id)).then((d) => {
            updateCfData(d, useSystem);
            setUser(d.data);
        });
    }, [id]);

    const flip_web_access = (
        user_id: number | undefined,
        current_value: boolean | undefined
    ) => {
        if (!user_id) {
            return;
        }

        grant_web_access(user_id, !current_value).then((r) => {
            updateCfData(r, useSystem);
            r.data.status == 'updated' && user !== undefined
                ? (setUser({ ...user, has_web_access: !user.has_web_access }),
                  toast.success('Запрос выполнен.', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: 'light',
                      transition: Slide,
                  }))
                : (toast.error('Произошла ошибка при выполнении запроса.', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: 'light',
                      transition: Slide,
                  }),
                  console.log(r.status, r.data));
        });
    };

    const flip_fired = (user_id: number | undefined) => {
        if (user_id == undefined || user == undefined) {
            return;
        }

        fire_user(user_id).then((r) => {
            updateCfData(r, useSystem);
            r.status == 200
                ? (setUser({
                      ...user,
                      is_fired: !user.is_fired,
                      is_trusted: !user.is_trusted,
                  }),
                  toast.success('Запрос выполенен.', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: 'light',
                      transition: Slide,
                  }))
                : (toast.error('Произошла ошибка при выполнении запроса.', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: 'light',
                      transition: Slide,
                  }),
                  console.log(r.status, r.data));
        });
    };

    const flip_trusted = (user_id: number | undefined) => {
        if (user_id == undefined || user == undefined) {
            return;
        }

        trust_user(user_id).then((r) => {
            updateCfData(r, useSystem);
            r.status == 200
                ? (setUser({ ...user, is_trusted: !user.is_trusted }),
                  toast.success('Запрос выполнен.', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: 'light',
                      transition: Slide,
                  }))
                : (toast.error('Произошла ошибка при выполнении запроса.', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: 'light',
                      transition: Slide,
                  }),
                  console.log(r.status, r.data));
        });
    };

    return (
        <div className={css.main_container}>
            <div className={css.container}>
                <h1 className={css.container__title}>Пользователь</h1>
                <div className={css.container__buttons}>
                    <PermissionRequiredComponent permissions={['users.trust']}>
                        <Button
                            title={
                                user?.is_trusted
                                    ? 'Отозвать доверие'
                                    : 'Сделать доверенным'
                            }
                            onClick={() => flip_trusted(user?.id)}
                        />
                    </PermissionRequiredComponent>
                    <PermissionRequiredComponent
                        permissions={['users.grant_web_access']}
                    >
                        <Button
                            title={
                                user?.has_web_access
                                    ? 'Отобрать доступ к веб-интерфейсу'
                                    : 'Дать доступ к веб-интерфейсу'
                            }
                            onClick={() =>
                                flip_web_access(user?.id, user?.has_web_access)
                            }
                        />
                    </PermissionRequiredComponent>
                    <PermissionRequiredComponent permissions={['users.fire']}>
                        <Button
                            title={user?.is_fired ? 'Восстановить' : 'Уволить'}
                            onClick={() => flip_fired(user?.id)}
                        />
                    </PermissionRequiredComponent>
                </div>
                <div className={css.split}>
                    <div>
                        <div className={css.image_container}>
                            <img
                                className={css.image}
                                src={`${routes.USER_GET + user?.id + '/image'}`}
                                alt=""
                            />
                        </div>
                    </div>
                    <div className={css.container}>
                        <div
                            className={classNames(
                                css.container__row,
                                css.user_sys_info
                            )}
                        >
                            <span>id: {user?.telegram_id}</span>
                            <span>
                                username:{' '}
                                {user?.telegram_username
                                    ? user?.telegram_username
                                    : 'Не указан.'}
                            </span>
                        </div>
                        <span className={css.container__row}>
                            Имя в Telegram: {user?.full_name}
                        </span>
                        <span className={css.container__row}>
                            Указанное ФИО:{' '}
                            <PermissionRequiredComponent
                                permissions={['users.write']}
                            >
                                {
                                    <UserInputComponent
                                        value={user?.commentary}
                                        user_id={user?.id}
                                    />
                                }
                            </PermissionRequiredComponent>
                        </span>
                        <span className={css.container__row}>
                            Является подтвержденным сотрудником:{' '}
                            {user?.is_trusted ? (
                                <span>Да</span>
                            ) : (
                                <span>Нет</span>
                            )}
                        </span>
                        <span className={css.container__row}>
                            Имеет доступ к веб-интерфейсу:{' '}
                            {user?.has_web_access ? (
                                <span>Да</span>
                            ) : (
                                <span>Нет</span>
                            )}
                        </span>
                        <span className={css.container__row}>
                            Уволен:{' '}
                            {user?.is_fired ? (
                                <span>Да</span>
                            ) : (
                                <span>Нет</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            {/*style={{backgroundImage: `url(${routes.USER_GET + user?.id + '/image'})`}}*/}
            <div className={css.container}>
                <div className={css.manageables_container}>
                    <h1 className={css.container__title}>Чаты</h1>
                    {user?.manageable_ref.map((m) => (
                        <ManageableBlockComponent
                            key={m.id}
                            manageable={m}
                            user_id={user?.id}
                        />
                    ))}
                    {user?.manageable_ref &&
                    user.manageable_ref.length > 0 ? null : (
                        <span>Пусто.</span>
                    )}
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="light"
                transition={Slide}
            />
        </div>
    );
};
