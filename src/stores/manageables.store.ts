import {hookstate, useHookstate} from "@hookstate/core";
import {IManageable} from "../types/manageable.ts";


const manageablesStore = hookstate<IManageable[]>([])


export const useManageablesStore = () => {
    return useHookstate(manageablesStore)
}

export const setManageables = (manageables: IManageable[]) => {
    manageablesStore.set(manageables)
}