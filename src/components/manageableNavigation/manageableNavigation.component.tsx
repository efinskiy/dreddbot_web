import css from './manageableNavigation.module.css'
import {useEffect} from "react";
import {GetAllManageables} from "../../api/manageables.ts";
import {useSystemStore} from "../../stores/system.store.ts";
import {updateCfData} from "../../utils/debug.ts";
import {useManageablesStore} from "../../stores/manageables.store.ts";

export const ManageableNavigationComponent = () => {
    const useSystem = useSystemStore();
    const useManageables = useManageablesStore();
    useEffect(() => {
        GetAllManageables().then(d => {
            updateCfData(d, useSystem)
            useManageables.set(d.data)
        })
    }, []);


    return (
        <div className={css.navigation}>
            <div className={css.wrapper}>
                <div className={css.searchBlock}>
                    <h3>Чаты</h3>
                </div>
                <div>
                    {useManageables.get().map(o => <div>{o.title}</div>)}
                </div>
            </div>
        </div>
    )
}