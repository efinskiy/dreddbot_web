import css from './emptyOutlet.module.css'

export const EmptyOutletComponent = () => {
    return (
        <div className={css.empty}>
            <h3 className={css.text}>Пусто</h3>
        </div>
    )
}