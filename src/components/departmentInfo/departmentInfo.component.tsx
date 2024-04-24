import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUserClear} from "../../types/user.ts";
import {IManageable} from "../../types/manageable.ts";
import {IDepartment} from "../../types/departments.ts";
import {GetDepartment, GetDepartmentManageables, GetDepartmentUsers} from "../../api/departments.ts";
import css from './departmentInfo.module.css'
import classNames from "classnames";
import {DepartmentInfoDataListComponent} from "../departmentInfoDataList/departmentInfoDataList.component.tsx";

export const DepartmentInfoComponent = () => {
    const { id} = useParams()
    const [department, setDepartment] = useState<IDepartment | null>(null);
    const [users, setUsers] = useState<IUserClear[]>([])
    const [manageables, setManageables] = useState<IManageable[]>([])


    useEffect(() => {
        GetDepartment(Number(id)).then(d => {
            setDepartment(d.data)
        })
        GetDepartmentUsers(Number(id)).then(d => {
            setUsers(d.data.users)
        })
        GetDepartmentManageables(Number(id)).then(d => {
            setManageables(d.data.manageables)
        })
    }, [id]);

    return (
        <div className={css.departmentInfo}>
            <div className={css.header}>
                <h3 className={css.title}>Отдел: {department?.name}</h3>
            </div>
            <div className={classNames(css.containerRow, css.m16)}>
                {<DepartmentInfoDataListComponent dep_id={Number(department?.id)} title={'Участники отдела'} users={users} type={'users'}/>}
                {<DepartmentInfoDataListComponent dep_id={Number(department?.id)} title={'Чаты отдела'} manageables={manageables} type={'manageables'}/>}
            </div>
        </div>
    )
}