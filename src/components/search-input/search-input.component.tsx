import css from './search-input.module.css'
import {useEffect, useState} from "react";
import {get_users, search_users} from "../../api/users.ts";
import {writeUsers} from "../../stores/users.store.ts";

export const SearchInputComponent = () => {
    const [search, setSearch] = useState('')
    // const usersStore = useUsersStore()

    useEffect(() => {
        if (search){
            search_users(search).then((d) => writeUsers(d))
        }
        else {
            get_users().then((d) => writeUsers(d))
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