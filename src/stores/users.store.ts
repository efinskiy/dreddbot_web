import { hookstate, useHookstate } from '@hookstate/core';
import { UserInSearch } from '../types/user.ts';

const usersStore = hookstate<UserInSearch[]>([]);

export const writeUsers = (users: UserInSearch[]) => {
    usersStore.set(users);
};

export const useUsersStore = () => {
    return useHookstate(usersStore);
};
