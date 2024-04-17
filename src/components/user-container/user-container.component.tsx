import css from './user-container.module.css'
import classNames from "classnames";
import {Button} from "../buttons/button.component.tsx";

export const UserContainerComponent = () => {
    return (
        <div className={css.container}>
            <h1 className={css.container__title}>Пользователь</h1>
            <div className={classNames(css.container__row, css.user_sys_info)}>
                <span>id: 294724588</span>
                <span>username: K1pry</span>
            </div>
            <span className={css.container__row}>Имя в Telegram: Кирилл EasyGoing</span>
            <span className={css.container__row}>Указанное ФИО: Александр Стрельник Алексеевич</span>
            <span className={css.container__row}>Является сотрудником: Да</span>
            <span className={css.container__row}>Имеет доступ к веб-интерфейсу: Нет</span>
            <span className={css.container__row}>Уволен: Нет</span>
            <div className={css.container__buttons}>
                {<Button title={'Дать доступ к веб-интерфейсу'} onClick={()=>alert(1)}/>}
                {<Button title={'Уволить'} onClick={()=>alert(1)} disabled={true}/>}
            </div>

        </div>
    )
}