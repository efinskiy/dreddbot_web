import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import MultiSelect from '@kenshooui/react-multi-select';
import css from './departmentObjectEdit.module.css';
import '@kenshooui/react-multi-select/dist/style.css';
import { Manageable } from '../../types/manageable.ts';
import {
    GetDepartmentManageables,
    UpdateDepartmentManageables,
} from '../../api/departments.ts';
import { GetAllManageables } from '../../api/manageables.ts';
import { useSystemStore } from '../../stores/system.store.ts';
import { updateCfData } from '../../utils/debug.ts';

interface IManageableInSelect {
    id: number;
    label: string;
}

export interface IDepartmentChanges {
    added: Array<number>;
    deleted: Array<number>;
}

export const DepartmentObjectEditManageablesComponent = () => {
    const { id } = useParams();
    const [manageableInSelectAvailable, setManageableInSelectAvailable] =
        useState<IManageableInSelect[]>([]);
    const [manageableInSelectSelected, setManageableInSelectSelected] =
        useState<IManageableInSelect[]>([]);
    const [
        manageableInSelectSelectedInitial,
        setManageableInSelectSelectedInitial,
    ] = useState<IManageableInSelect[]>([]);
    const useSystem = useSystemStore();

    useEffect(() => {
        GetDepartmentManageables(Number(id)).then((d) => {
            const transformed = transform(d.data.manageables);
            setManageableInSelectSelected(transformed);
            setManageableInSelectSelectedInitial(transformed);
            updateCfData(d, useSystem);
        });
        GetAllManageables().then((d) => {
            setManageableInSelectAvailable(transform(d.data));
            updateCfData(d, useSystem);
        });
    }, []);

    const transformToSelectType = (obj: Manageable): IManageableInSelect => {
        return {
            id: obj.id,
            label: obj.title,
        };
    };

    const transform = (objs: Manageable[]): IManageableInSelect[] => {
        return objs.map(transformToSelectType);
    };

    const updateManageables = () => {
        const data = figureChanges(
            manageableInSelectSelectedInitial,
            manageableInSelectSelected
        );
        UpdateDepartmentManageables(Number(id), data).then((d) => {
            updateCfData(d, useSystem);
            d.status === 200 ? alert('Обновлено') : alert('Ошибка.');
        });
    };

    const figureChanges = (
        initial: IManageableInSelect[],
        final: IManageableInSelect[]
    ): IDepartmentChanges => {
        // Найти добавленные элементы
        const addedElements = final.filter(
            (item2) => !initial.some((item1) => item1.id === item2.id)
        );

        // Найти удаленные элементы
        const removedElements = initial.filter(
            (item1) => !final.some((item2) => item2.id === item1.id)
        );

        return {
            added: addedElements.map((addedElement) => addedElement.id),
            deleted: removedElements.map((removedElement) => removedElement.id),
        };
    };

    return (
        <div className={css.block}>
            <MultiSelect
                items={manageableInSelectAvailable}
                selectedItems={manageableInSelectSelected}
                onChange={(d: IManageableInSelect[]) => {
                    setManageableInSelectSelected(d);
                }}
                showSearch={true}
                showSelectAll={false}
            />
            <button onClick={() => updateManageables()}>Сохранить</button>
        </div>
    );
};
