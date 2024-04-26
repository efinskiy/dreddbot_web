import {hookstate, useHookstate} from "@hookstate/core";

export interface ISystemStore{
    show_debug: boolean
    last_process_time: number
    u_ip: string
}

const systemStoreInitialState: ISystemStore = {
    show_debug: true,
    last_process_time: 0,
    u_ip: 'unset'
}


const systemStore = hookstate<ISystemStore>(systemStoreInitialState);


export const useSystemStore = () => {
    return useHookstate<ISystemStore>(systemStore)
}
