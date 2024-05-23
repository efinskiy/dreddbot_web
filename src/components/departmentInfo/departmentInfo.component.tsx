import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UserClear } from '../../types/user.ts';
import { Manageable } from '../../types/manageable.ts';
import { Department } from '../../types/departments.ts';
import {
    GetDepartment,
    GetDepartmentManageables,
    GetDepartmentUsers,
} from '../../api/departments.ts';
import css from './departmentInfo.module.css';
import classNames from 'classnames';
import { DepartmentInfoDataListComponent } from '../departmentInfoDataList/departmentInfoDataList.component.tsx';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';

export const DepartmentInfoComponent = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState<Department | null>(null);
    const [users, setUsers] = useState<UserClear[]>([]);
    const [manageables, setManageables] = useState<Manageable[]>([]);
    const useSystem = useSystemStore();

    useEffect(() => {
        GetDepartment(Number(id)).then((d) => {
            setDepartment(d.data);
            updateCfData(d, useSystem);
        });
        GetDepartmentUsers(Number(id)).then((d) => {
            setUsers(
                d.data.users.map((el) => ({
                    ...el,
                    full_name: el.full_name?.split(' None')[0],
                }))
            );
            updateCfData(d, useSystem);
        });
        GetDepartmentManageables(Number(id)).then((d) => {
            setManageables(d.data.manageables);
            updateCfData(d, useSystem);
        });
    }, [id, useSystem]);

    return (
        <div className={css.departmentInfo}>
            <div className={css.header}>
                <h3 className={css.title}>Отдел: {department?.name}</h3>
            </div>
            <div className={classNames(css.containerRow, css.m16)}>
                {
                    <DepartmentInfoDataListComponent
                        dep_id={Number(department?.id)}
                        title={'Участники отдела'}
                        users={users}
                        type={'users'}
                    />
                }
                {
                    <DepartmentInfoDataListComponent
                        dep_id={Number(department?.id)}
                        title={'Чаты отдела'}
                        manageables={manageables}
                        type={'manageables'}
                    />
                }
            </div>
        </div>
    );
};
