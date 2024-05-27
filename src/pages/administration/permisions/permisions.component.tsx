import css from './permisions.module.css';

interface PermissionsHeaderProps {
    labels: Array<string>;
}

export const PermissionsHeader = ({ labels }: PermissionsHeaderProps) => {
    return (
        <div className={css.wrap}>
            <div className={css.space}></div>
            {labels.map((label) => (
                <span key={label} className={css.label}>
                    {label}
                </span>
            ))}
        </div>
    );
};
