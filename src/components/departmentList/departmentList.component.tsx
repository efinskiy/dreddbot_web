import css from './departmentList.module.css';
import {useEffect, useState} from "react";
import {IDepartment} from "../../types/departments.ts";
import {GetAllDepartments} from "../../api/departments.ts";
import {DepartmentListElementComponent} from "../departmentListElement/departmentListElement.component.tsx";
import {Button} from "../buttons/button.component.tsx";
// import {redirect} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useSystemStore} from "../../stores/system.store.ts";
import {updateCfData} from "../../utils/debug.ts";

export const DepartmentListComponent = () => {
    const [departments, setDepartments] = useState<IDepartment[]>([])
    const navigate = useNavigate();
    const useSystem = useSystemStore()

    useEffect(() => {
        GetAllDepartments().then(res => {
            setDepartments(res.data)
            updateCfData(res, useSystem)
        })
    }, []);

    return (
        <div className={css.departments}>
            <div className={css.departments_title_container}>
                <h3 className={css.departments_title}>Список отделов</h3>
                <Button title={'Создать'} onClick={()=>navigate('/department/new')}></Button>
            </div>
            <div className={css.departments_list}>
                {
                    departments.map((department: IDepartment) => <>
                        <DepartmentListElementComponent department={department} key={department.id}/>
                    </>
                    )
                }
            </div>
        </div>
    )
}