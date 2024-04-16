import css from './search-input.module.css'

export const SearchInputComponent = () => {
    return (
        <input
            className={css.searchinput}
            type="search"
            placeholder={'Введите ФИО'}
        />
    )
}