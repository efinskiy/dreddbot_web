import css from './departmentList.module.css';
import { useEffect, useState } from 'react';
import { IDepartment } from '../../types/departments.ts';
import { GetAllDepartments } from '../../api/departments.ts';
import { DepartmentListElementComponent } from '../departmentListElement/departmentListElement.component.tsx';
import { Button } from '../buttons/button.component.tsx';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';

import { CreateDepartmentPopup } from './createDepartmentPopup/createDepartmentPopup.component.tsx';

export const DepartmentListComponent = () => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const useSystem = useSystemStore();
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        GetAllDepartments().then((res) => {
            setDepartments(res.data);
            updateCfData(res, useSystem);
        });
    }, [useSystem]);

    return (
        <div className={css.departments}>
            <CreateDepartmentPopup isOpen={popupOpen} setOpen={setPopupOpen} />
            <div className={css.departments_title_container}>
                <h3 className={css.departments_title}>Список отделов</h3>
                <Button
                    title={'Создать'}
                    onClick={() => setPopupOpen((o) => !o)}
                />
            </div>
            <div className={css.departments_list}>
                {departments.map((department: IDepartment) => (
                    <>
                        <DepartmentListElementComponent
                            department={department}
                            key={department.id}
                        />
                    </>
                ))}
            </div>
        </div>
    );
};
