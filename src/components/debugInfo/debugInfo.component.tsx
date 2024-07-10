import css from '../header/navigationMenu.module.css';
import { useAuthState } from '../../stores/auth.store.ts';
import { useSystemStore } from '../../stores/system.store.ts';

interface IDebugInfoProps {
    remaining: number;
}

export const DebugInfo = ({ remaining }: IDebugInfoProps) => {
    const useAuth = useAuthState();
    const useSystem = useSystemStore();

    return (
        <div className={css.absoluteUserInfo}>
            debug: {Number(useAuth.isLoggedIn.get())},{useAuth.user_id.get()},
            {useAuth.valid_until.get()}({remaining}),
            {useSystem.u_ip.get()},{useSystem.last_process_time.get() * 1000}ms.
        </div>
    );
};
