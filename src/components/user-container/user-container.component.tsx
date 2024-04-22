import css from './user-container.module.css'
import classNames from "classnames";
import {Button} from "../buttons/button.component.tsx";
import {IUser} from "../../types/user.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fire_user, get_user, grant_web_access} from "../../api/users.ts";
import {ManageableBlockComponent} from "../manageable-block/manageable-block.component.tsx";
import {UserInputComponent} from "../user-input/user-input.component.tsx";

export const UserContainerComponent = () => {
    const { id} = useParams()
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        get_user(Number(id)).then(d => setUser(d))
    }, [id]);


    const flip_web_access = (user_id: number | undefined, current_value: boolean | undefined) => {
        if (!user_id){
            return
        }

        grant_web_access(user_id, !current_value).then(r => {
            r.status == 'updated' && user !== undefined ?
                setUser({...user, has_web_access: !user.has_web_access})
                : alert('')
        })
    }

    const flip_fired = (user_id: number | undefined) => {
        if (user_id == undefined ||
            user == undefined){
            return
        }

        fire_user(user_id).then(r => {
            r.status == 200 ?
                setUser({...user, is_fired: !user.is_fired, is_trusted: !user.is_trusted})
                : alert('')
        })
    }

    // @ts-ignore
    return (
        <div className={css.main_container}>
            <div className={css.container}>
                <h1 className={css.container__title}>Пользователь</h1>
                <div className={css.container__buttons}>
                    {<Button
                        title={user?.has_web_access ? 'Отобрать доступ к веб-интерфейсу' : 'Дать доступ к веб-интерфейсу'}
                        onClick={()=>flip_web_access(user?.id, user?.has_web_access)}/>
                    }
                    {<Button title={user?.is_fired ? 'Восстановить' : 'Уволить'}
                             onClick={()=>flip_fired(user?.id)}
                    />}
                </div>
                <div className={classNames(css.container__row, css.user_sys_info)}>
                    <span>id: {user?.telegram_id}</span>
                    <span>username: {user?.telegram_username ? user?.telegram_username : 'Не указан.'}</span>
                </div>
                <span className={css.container__row}>Имя в Telegram: {user?.full_name}</span>
                <span className={css.container__row}>Указанное ФИО: {<UserInputComponent value={user?.commentary} user_id={user?.id}/>}</span>
                <span className={css.container__row}>Имеет доступ к веб-интерфейсу: {user?.has_web_access ? <span>Да</span> : <span>Нет</span>}</span>
                {/*<span className={css.container__row}>Является сотрудником: {user?.is_trusted ? <span>Да</span> : <span>Нет</span>}</span>*/}
                <span className={css.container__row}>Уволен: {user?.is_fired ? <span>Да</span> : <span>Нет</span>}</span>
            </div>
            <div className={css.container}>
                <h1 className={css.container__title}>Участник</h1>
                {user?.manageable_ref.map(m => <ManageableBlockComponent key={m.id} manageable={m} user_id={user?.id} />)}
                {user?.manageable_ref && user.manageable_ref.length > 0 ? <></> : <span>Пусто.</span>}
            </div>
        </div>
    )
}