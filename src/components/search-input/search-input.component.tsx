import css from './search-input.module.css';
import { SetStateAction, useEffect, useState } from 'react';
import { get_users } from '../../api/users.ts';
import { writeUsers } from '../../stores/users.store.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { IUserInSearch } from '../../types/user.ts';

export const SearchInputComponent = () => {
    const [search, setSearch] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const useSystem = useSystemStore();
    const [allUsers, setAllUsers] = useState<IUserInSearch[]>([]);

    // const usersStore = useUsersStore()

    useEffect(() => {
        get_users().then((d) => {
            updateCfData(d, useSystem);
            setAllUsers(d.data);
            writeUsers(d.data);
        });
    }, []);

    useEffect(() => {
        switch (selectedFilter) {
            case 'all':
                writeUsers(
                    allUsers.filter((user) => user.commentary?.includes(search))
                );
                break;
            case 'fired':
                writeUsers(
                    allUsers
                        .filter((user) => user.is_fired)
                        .filter((user) => user.commentary?.includes(search))
                );
                break;
            case 'not_confirmed':
                writeUsers(
                    allUsers
                        .filter((user) => !user.is_trusted)
                        .filter((user) => user.commentary?.includes(search))
                );
                break;
            case 'only_confirmed':
                writeUsers(
                    allUsers
                        .filter((user) => user.is_trusted)
                        .filter((user) => user.commentary?.includes(search))
                );
                break;
        }
    }, [allUsers, search, selectedFilter]);

    const changeRadioValue = (event: {
        target: { value: SetStateAction<string> };
    }) => {
        setSelectedFilter(event.target.value);
    };

    return (
        <>
            <input
                className={css.searchinput}
                type="search"
                placeholder={'Поисковая строка'}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />
            <div className={css.filtersContainer}>
                <div>
                    <input
                        type="radio"
                        name="filter"
                        id="all"
                        value="all"
                        checked={selectedFilter == 'all'}
                        onChange={changeRadioValue}
                    />
                    <label htmlFor="all">Все</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="filter"
                        id="fired"
                        value="fired"
                        checked={selectedFilter == 'fired'}
                        onChange={changeRadioValue}
                    />
                    <label htmlFor="fired">Уволенные</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="filter"
                        id="not_confirmed"
                        value="not_confirmed"
                        checked={selectedFilter == 'not_confirmed'}
                        onChange={changeRadioValue}
                    />
                    <label htmlFor="not_confirmed">Неподтвержденные</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="filter"
                        id="only_confirmed"
                        value="only_confirmed"
                        checked={selectedFilter == 'only_confirmed'}
                        onChange={changeRadioValue}
                    />
                    <label htmlFor="only_confirmed">Подтвержденные</label>
                </div>
            </div>
        </>
    );
};
