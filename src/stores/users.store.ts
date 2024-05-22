import { hookstate, useHookstate } from '@hookstate/core';
import { IUserInSearch } from '../types/user.ts';

const usersStore = hookstate<IUserInSearch[]>([]);

export const writeUsers = (users: IUserInSearch[]) => {
    usersStore.set(users);
};

export const useUsersStore = () => {
    return useHookstate(usersStore);
};
