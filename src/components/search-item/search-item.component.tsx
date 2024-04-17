import css from './search-item.module.css';

export const SearchItemComponent = (() => {
    return (
        <div className={css.item}>
            <span className={css.tg_name}>Кирилл EasyGoing</span>
            <span className={css.commentary}>Александр Стрельник Алексеевич </span>
        </div>
    )
})