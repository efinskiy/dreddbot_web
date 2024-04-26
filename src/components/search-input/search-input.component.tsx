import css from './search-input.module.css'
import {useEffect, useState} from "react";
import {get_users, search_users} from "../../api/users.ts";
import {writeUsers} from "../../stores/users.store.ts";
import {useSystemStore} from "../../stores/system.store.ts";
import {updateCfData} from "../../utils/debug.ts";

export const SearchInputComponent = () => {
    const [search, setSearch] = useState('')
    const useSystem = useSystemStore()

    // const usersStore = useUsersStore()

    useEffect(() => {
        if (search){
            search_users(search).then((d) => {
                updateCfData(d, useSystem)
                writeUsers(d.data)
            })
        }
        else {
            get_users().then((d) => {
                updateCfData(d, useSystem)
                writeUsers(d.data)
            })
        }
    }, [search]);

    return (
        <input
            className={css.searchinput}
            type="search"
            placeholder={'Поисковая строка'}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
        />
    )
}