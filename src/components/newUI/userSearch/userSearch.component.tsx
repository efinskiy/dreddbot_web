import css from './userSearch.module.css';
import classNames from 'classnames';
import { BackgroundlessComponent } from '../backgroundlessComponent/backgroundless.component.tsx';
import { BackgroundedSearchComponent } from '../backgroundedSearchComponent/backgroundedSearch.component.tsx';
import {
    TableComponent,
    TableHeaderComponent,
    TableRowComponent,
} from '../table/table.component.tsx';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { get_users, search_users } from '../../../api/users.ts';
import { updateCfData } from '../../../utils/debug.ts';
import { writeUsers } from '../../../stores/users.store.ts';
import { UserInSearch } from '../../../types/user.ts';
import { Indicator } from '../indicator/indicator.component.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button/button.component.tsx';

export const UserSearchComponent = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [offset, setOffset] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalRows, setTotalRows] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([1]);

    const [isLoading, setIsLoading] = useState(true);
    const [usersRaw, setUsersRaw] = useState<UserInSearch[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserInSearch[]>([]);
    const [childs, setChilds] = useState<ReactNode[][]>([]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalRows / 10));
    }, [totalRows]);

    useEffect(() => {
        const new_arr = new Array(totalPages).fill(null).map((_, i) => i + 1);
        setPages(new_arr);
    }, [totalPages]);

    useEffect(() => {
        search_users(searchValue, offset, 10)
            .then((d) => {
                setIsLoading(true);
                // updateCfData(d, useSystem);
                setUsersRaw(d.data.result);
                setTotalRows(d.data.total);
            })
            .then(() => {
                setIsLoading(false);
            });
    }, [searchValue, offset, currentPage]);

    useEffect(() => {
        setChilds(
            filteredUsers.map((user) => [
                <>{user.id}</>,
                <>{user.commentary}</>,
                <>{user.full_name}</>,
                <>
                    {user.is_trusted ? (
                        <Indicator
                            color={'green'}
                            text={'Да'}
                            width={'stretch'}
                        />
                    ) : (
                        <Indicator
                            color={'red'}
                            text={'Нет'}
                            width={'stretch'}
                        />
                    )}
                </>,
                <>
                    {user.has_web_access ? (
                        <Indicator
                            color={'green'}
                            text={'Да'}
                            width={'stretch'}
                        />
                    ) : (
                        <Indicator
                            color={'red'}
                            text={'Нет'}
                            width={'stretch'}
                        />
                    )}
                </>,
                <>
                    {user.is_fired ? (
                        <Indicator
                            color={'red'}
                            text={'Да'}
                            width={'stretch'}
                        />
                    ) : (
                        <Indicator
                            color={'green'}
                            text={'Нет'}
                            width={'stretch'}
                        />
                    )}
                </>,
                <div className={css.center_in_table}>
                    <Link to={`/user/${user.id}`}>
                        <Button type={'gray'} size={'fill'}>
                            Открыть
                        </Button>
                    </Link>
                </div>,
            ])
        );
    }, [filteredUsers]);

    // Filters
    useEffect(() => {
        setFilteredUsers(usersRaw);
    }, [usersRaw]);

    const handleEnterKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key == 'Enter') {
                if (filteredUsers.length > 0) {
                    navigate(`/user/${filteredUsers[0].id}`);
                }
            }
        },
        [filteredUsers]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleEnterKeyPress);
        return () => window.removeEventListener('keydown', handleEnterKeyPress);
    }, [handleEnterKeyPress]);

    const changePage = (page: number) => {
        setOffset(page * 10 - 10);
        setCurrentPage(page);
    };
    return (
        <div className={classNames(css.users)}>
            <BackgroundlessComponent>
                <div className={css.header_title_block}>
                    <h2>Пользователи</h2>
                    <div></div>
                </div>
            </BackgroundlessComponent>
            <BackgroundlessComponent>
                <BackgroundedSearchComponent
                    placeholder={'Поиск по №, ФИО, Telegram'}
                    value={searchValue}
                    onChange={setSearchValue}
                />
                <>
                    {!isLoading ? (
                        <TableComponent>
                            <TableHeaderComponent
                                titles={[
                                    '№',
                                    'ФИО',
                                    'Имя Telegram',
                                    'Подтвержден',
                                    'Доступ к сервису',
                                    'Уволен',
                                    'Действия',
                                ]}
                            />
                            {childs.map((c) => (
                                <TableRowComponent childs={c} />
                            ))}
                        </TableComponent>
                    ) : null}
                </>

                <div className={css.pagination_buttons}>
                    {pages.map((page) => (
                        <button
                            onClick={() => changePage(page)}
                            disabled={currentPage == page}
                            className={css.pagination_button}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </BackgroundlessComponent>
        </div>
    );
};
