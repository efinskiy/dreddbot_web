import { useAuthState } from '../../stores/auth.store.ts';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
    children: ReactNode;
    permissions: string[];
}

export const PermissionRequiredComponent = ({
    children,
    permissions,
}: Props) => {
    const useAuth = useAuthState();
    const [accessGranted, setAccessGranted] = useState(false);

    useEffect(() => {
        if (
            useAuth.permissions.get().includes('admin.all') ||
            permissions.every((ai) => useAuth.permissions.get().includes(ai))
        ) {
            setAccessGranted(true);
        }
    }, [useAuth]);
    if (accessGranted) {
        return children;
    } else {
        return null;
    }
};
