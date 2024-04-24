import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUserClear} from "../../types/user.ts";
import {GetDepartmentAvailableUsers, GetDepartmentUsers} from "../../api/departments.ts";
import css from './departmentObjectEdit.module.css'

import { ListBox } from 'primereact/listbox';
interface City {
    name: string;
    code: string;
}

export const DepartmentObjectEditComponent = () => {
    const {id} = useParams()
    const [usersAdded, setUsersAdded] = useState<IUserClear[]>([])
    const [usersDeleted, setUsersDeleted] = useState<IUserClear[]>([])
    const [usersInitial, setUsersInitial] = useState<IUserClear[]>([])
    const [usersAvailable, setUsersAvailable] = useState<IUserClear[]>([])

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const cities: City[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    useEffect(() => {
        GetDepartmentUsers(Number(id)).then(d => {
            setUsersInitial(d.data.users)
        })
        GetDepartmentAvailableUsers(Number(id)).then(d => {
            setUsersAvailable(d.data)
        })
    }, []);


    return (
        <div className={css.block}>
            <div>
                {/*{*/}
                {/*    usersInitial.map(u =>*/}
                {/*        <div>{u.full_name}</div>*/}
                {/*    )*/}
                {/*}*/}
                {/*<ListBox value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem" />*/}
            </div>
            <div>
                {/*{*/}
                {/*    usersAvailable.map(u => <div>{u.full_name}</div>)*/}
                {/*}*/}
            </div>
        </div>
    )
}