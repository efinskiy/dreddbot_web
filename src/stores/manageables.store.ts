import { hookstate, useHookstate } from '@hookstate/core';
import { Manageable } from '../types/manageable.ts';

const manageablesStore = hookstate<Manageable[]>([]);

export const useManageablesStore = () => {
    return useHookstate(manageablesStore);
};

export const setManageables = (manageables: Manageable[]) => {
    manageablesStore.set(manageables);
};
