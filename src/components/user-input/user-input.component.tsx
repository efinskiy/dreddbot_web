import css from './user-input.module.css'
import {useEffect, useState} from "react";
import {update_commentary} from "../../api/users.ts";
import {updateCfData} from "../../utils/debug.ts";
import {useSystemStore} from "../../stores/system.store.ts";

export interface IUserInput {
    user_id: number | undefined;
    value: string | undefined;
}


export const UserInputComponent = ({value, user_id}: IUserInput) => {
    const [inputState, setInputState] =
        useState<string | undefined>('');

    useEffect(() => {
        if (value == null){
            setInputState('')
        } else {
            setInputState(value)
        }
    }, [value]);
    const useSystem = useSystemStore();


    const send_update = (user_id: number | undefined, new_value: string | undefined) => {
        if (!user_id || !new_value){
            alert('Невозможно обновить. Проверьте ввод.')
            return
        }
        update_commentary(user_id, new_value).then(r => {
            updateCfData(r, useSystem)
            alert(r.status)
        })
    }

    return (
        <>
        <input
            className={css.input}
            placeholder={'Пусто'}
            value={inputState?.toString()}
            onChange={(e) => setInputState(e.target.value)}
        />
        <button onClick={()=>send_update(user_id, inputState?.toString())}>✔</button>
        </>
    )
}