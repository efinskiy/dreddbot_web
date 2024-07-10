import { useLocation } from 'react-router-dom';

export const NotFoundComponent = () => {
    const location = useLocation();
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h3>
                😔Упс, кажется вы ошиблись. Страницы {location.pathname} не
                существует.
            </h3>
        </div>
    );
};
