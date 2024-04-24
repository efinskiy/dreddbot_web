import css from './departmentInfoDataList.module.css'
import {Button} from "../buttons/button.component.tsx";
import {IUserClear} from "../../types/user.ts";
import {IManageable} from "../../types/manageable.ts";
import {
    DepartmentInfoDataListManageableElement
} from "../departmentInfoDataListElement/elementManageable.component.tsx";
import {DepartmentInfoDataListUserElement} from "../departmentInfoDataListElement/elementUser.component.tsx";
import {useNavigate} from "react-router-dom";

interface IDepartmentInfoDataListProps {
    title: string
    dep_id: number
    type: string
    users?: IUserClear[]
    manageables?: IManageable[]
}

export const DepartmentInfoDataListComponent = ({title, type, users, manageables, dep_id}: IDepartmentInfoDataListProps) => {
    // @ts-ignore
    const navigate = useNavigate()
    return (
        <div className={css.dataContainer}>
            <div className={css.title}>
                <span>
                    {title}
                </span>
                <Button title={'Редактировать'} onClick={()=>navigate(`/department/${dep_id}/${type}`)}/>
            </div>
            <div className={css.elements}>
                {
                    type === 'users'
                    ? users?.map((o: IUserClear) => <DepartmentInfoDataListUserElement obj={o}/>)
                    : type === 'manageables'
                        ? manageables?.map((o: IManageable) => <DepartmentInfoDataListManageableElement obj={o}/>)
                        : <></>
                }
            </div>
        </div>
    )
}