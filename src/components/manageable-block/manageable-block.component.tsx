import {IManageable} from "../../types/manageable.ts";
import css from './manageable-block.module.css';
import {Button} from "../buttons/button.component.tsx";

export const ManageableBlockComponent = (manageable: IManageable) => {
    return (
        <div className={css.container}>
            <span className={css.title}>{manageable.title}</span>
            <Button title={'Исключить'} onClick={()=>alert('Не работает ;(')}/>
        </div>
    )
}