import css from './user-input.module.css'
import {useEffect, useState} from "react";

export interface IUserInput {
    user_id: number | undefined;
    value: string | undefined;
}


export const UserInputComponent = ({value, user_id}: IUserInput) => {
    const [inputState, setInputState] =
        useState<string | undefined>('')
    useEffect(() => {
        if (value == null){
            setInputState('')
        } else {
            setInputState(value)
        }
    }, [value]);
    return (
        <>
        <input
            className={css.input}
            placeholder={'Пусто'}
            value={inputState?.toString()}
            onChange={(e) => setInputState(e.target.value)}
        />
        <button onClick={()=>alert(user_id)}>✔</button>
        </>
    )
}