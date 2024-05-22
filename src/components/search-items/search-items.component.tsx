import { SearchItemComponent } from '../search-item/search-item.component.tsx';
// import {useEffect} from "react";
import { useUsersStore } from '../../stores/users.store.ts';

export const SearchItemsComponent = () => {
    const usersInSearch = useUsersStore();
    // useEffect(() => {
    //
    // }, [usersInSearch]);
    return (
        <>
            {usersInSearch.map((u) => (
                <SearchItemComponent
                    key={u.id.value}
                    id={u.id.value}
                    tg_name={u.full_name.value.replace('None', '')}
                    commentary={u.commentary.value}
                />
            ))}
        </>
    );
};
