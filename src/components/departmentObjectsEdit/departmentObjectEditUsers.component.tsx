import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUserClear} from "../../types/user.ts";
import {GetAllUsers, GetDepartmentUsers, UpdateDepartmentUsers} from "../../api/departments.ts";
// @ts-ignore
import MultiSelect from "@kenshooui/react-multi-select";
import css from './departmentObjectEdit.module.css'
import "@kenshooui/react-multi-select/dist/style.css"
import {useSystemStore} from "../../stores/system.store.ts";
import {updateCfData} from "../../utils/debug.ts";


interface IUserInSelect{
    id: number
    label: string
}

export interface IDepartmentChanges{
    added: Array<number>
    deleted: Array<number>
}


export const DepartmentObjectEditUsersComponent = () => {
    const {id} = useParams()
    const [usersInSelectAvailable, setUsersInSelectAvailable] = useState<IUserInSelect[]>([])
    const [usersInSelectSelected, setUsersInSelectSelected] = useState<IUserInSelect[]>([])
    const [usersInSelectSelectedInitial, setUsersInSelectSelectedInitial] = useState<IUserInSelect[]>([])
    const useSystem = useSystemStore()


    useEffect(() => {
        GetDepartmentUsers(Number(id)).then(d => {
            const transformed = transform(d.data.users)
            setUsersInSelectSelected(transformed)
            setUsersInSelectSelectedInitial(transformed)
            updateCfData(d, useSystem)

        })
        GetAllUsers().then(d => {
            setUsersInSelectAvailable(transform(d.data))
            updateCfData(d, useSystem)

        })
    }, []);

    const transformToSelectType = (obj: IUserClear): IUserInSelect => {
        return {
            id: obj.id,
            label: `${obj.full_name} | ${obj.commentary}`
        }
    }

    const transform = (objs: IUserClear[]): IUserInSelect[] => {
        return objs.map(transformToSelectType)
    }

    const updateUsers = () => {
        const data = figureChanges(usersInSelectSelectedInitial, usersInSelectSelected)
        console.log(data)
        UpdateDepartmentUsers(Number(id), data).then(
            d => {
                updateCfData(d, useSystem)
                d.status === 200 ? alert('Обновлено')
                    : alert('Ошибка.')

            }
        )
    }

    const figureChanges = (initial: IUserInSelect[], final: IUserInSelect[]) : IDepartmentChanges => {
        // Найти добавленные элементы
        const addedElements = final.filter(item2 => !initial.some(item1 => item1.id === item2.id));

        // Найти удаленные элементы
        const removedElements = initial.filter(item1 => !final.some(item2 => item2.id === item1.id));

        return {
            added: addedElements.map(addedElement => addedElement.id),
            deleted: removedElements.map(removedElement => removedElement.id),
        }
    }


    return (
        <div className={css.block}>
            <MultiSelect
                items={usersInSelectAvailable}
                selectedItems={usersInSelectSelected}
                onChange={d => {setUsersInSelectSelected(d)}}
                showSearch={true}
                showSelectAll={false}
            />
            <button onClick={() => updateUsers()}>Сохранить</button>
        </div>
    )
}