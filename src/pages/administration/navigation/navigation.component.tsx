import { LinkComponent } from './link.component.tsx';
import css from './navigation.module.css';

interface Path {
    path: string;
    title: string;
}

export const NavigationComponent = () => {
    const paths: Path[] = [
        { path: '/administration/matrix', title: 'Матрица ролей' },
        { path: '/administration/logs', title: 'Логи' },
    ];

    return (
        <div className={css.links}>
            {paths.map((p) => (
                <LinkComponent to={p.path} title={p.title} />
            ))}
        </div>
    );
};
