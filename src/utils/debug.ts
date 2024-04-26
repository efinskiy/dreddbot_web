import {AxiosResponse} from "axios";
import {ISystemStore} from "../stores/system.store.ts";
import {State} from "@hookstate/core";


export const updateCfData = (d: AxiosResponse, store: State<ISystemStore>) => {
    store.u_ip.set(d.headers['cf-access-ip'])
    store.last_process_time.set(
        Number(Number(d.headers['cf-process-time']).toFixed(3))
    )
}