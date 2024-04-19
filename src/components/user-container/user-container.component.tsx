import css from './user-container.module.css'
import classNames from "classnames";
import {Button} from "../buttons/button.component.tsx";
import {IUser} from "../../types/user.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {get_user} from "../../api/users.ts";
import {ManageableBlockComponent} from "../manageable-block/manageable-block.component.tsx";
import {UserInputComponent} from "../user-input/user-input.component.tsx";

export const UserContainerComponent = () => {
    const { id} = useParams()
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        get_user(Number(id)).then(d => setUser(d))
    }, [id]);

    return (
        <div className={css.main_container}>
            <div className={css.container}>
                <h1 className={css.container__title}>Пользователь</h1>
                <div className={css.container__buttons}>
                    {<Button
                        title={user?.has_web_access ? 'Отобрать доступ к веб-интерфейсу' : 'Дать доступ к веб-интерфейсу'}
                        onClick={()=>alert(1)}/>
                    }
                    {<Button title={'Уволить'}
                             onClick={()=>alert(1)}
                             disabled={user?.is_fired}/>}
                </div>
                <div className={classNames(css.container__row, css.user_sys_info)}>
                    <span>id: {user?.telegram_id}</span>
                    <span>username: {user?.telegram_username}</span>
                </div>
                <span className={css.container__row}>Имя в Telegram: {user?.full_name}</span>
                <span className={css.container__row}>Указанное ФИО: {<UserInputComponent value={user?.commentary} user_id={user?.id}/>}</span>
                <span className={css.container__row}>Имеет доступ к веб-интерфейсу: {user?.has_web_access ? <span>Да</span> : <span>Нет</span>}</span>
                {/*<span className={css.container__row}>Является сотрудником: {user?.is_trusted ? <span>Да</span> : <span>Нет</span>}</span>*/}
                <span className={css.container__row}>Уволен: {user?.is_fired ? <span>Да</span> : <span>Нет</span>}</span>
            </div>
            <div className={css.container}>
                <h1 className={css.container__title}>Участник</h1>
                {user?.manageable_ref.map(m => <ManageableBlockComponent key={m.id} {...m} />)}
            </div>
        </div>
    )
}