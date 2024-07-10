import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        Cookies.remove('at');
        Cookies.remove('vu');
    }, []);
    useEffect(() => {
        const at = Cookies.get('at');
        const vu = Cookies.get('vu');
        if (at == undefined && vu == undefined) {
            navigate('/login');
        }
    }, [Cookies]);
    return <></>;
};
