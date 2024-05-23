import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ManageableSaturated } from '../../types/manageable.ts';
import { GetOneManageable } from '../../api/manageables.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';
import { EmptyOutletComponent } from '../emptyOutlet/emptyOutlet.component.tsx';
import css from './manageableContent.module.css';
import classNames from 'classnames';
import { ManageableLink } from '../manageableLink/manageableLink.component.tsx';

export const ManageableContentComponent = () => {
    const { id } = useParams();
    const useSystem = useSystemStore();
    const [manageable, setManageable] = useState<ManageableSaturated | null>(
        null
    );

    useEffect(() => {
        GetOneManageable(Number(id)).then((r) => {
            updateCfData(r, useSystem);
            setManageable(r.data);
        });
    }, [id]);

    return manageable ? (
        <div className={css.contentWrapper}>
            <div className={css.content}>
                <div className={css.manageableInfo}>
                    <h3 className={css.title}>Информация о чате</h3>
                </div>
                <div className={css.linkedWithContainer}>
                    <h3
                        className={classNames(
                            css.title,
                            css.centeredText,
                            css.borderBottom,
                            css.m
                        )}
                    >
                        Связи
                    </h3>
                    <div className={css.linksTitles}>
                        <h3
                            className={classNames(
                                css.title,
                                css.linksTitle,
                                css.centeredText,
                                css.borderRight
                            )}
                        >
                            Пользователи
                        </h3>
                        <h3
                            className={classNames(
                                css.title,
                                css.linksTitle,
                                css.centeredText
                            )}
                        >
                            Отделы
                        </h3>
                    </div>
                    <div className={css.rowContainer}>
                        <div
                            className={classNames(
                                css.halfWidthContainer,
                                css.borderRight
                            )}
                        >
                            {manageable.user_ref.map((u) => (
                                <ManageableLink
                                    link={`/user/${u.id}`}
                                    title={`${u.full_name?.replace(
                                        'None',
                                        ''
                                    )} | ${u.commentary}`}
                                    key={u.id}
                                />
                            ))}
                        </div>
                        <div className={css.halfWidthContainer}>
                            {manageable.departments.map((d) => (
                                <ManageableLink
                                    link={`/department/${d.id}`}
                                    title={d.name}
                                    key={d.id}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <EmptyOutletComponent />
    );
};
