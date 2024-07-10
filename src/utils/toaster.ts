import { Slide, toast } from 'react-toastify';

export const toast_error = (text: string) => {
    toast.error(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
        transition: Slide,
        containerId: 'toaster',
    });
};

export const toast_success = (text: string) => {
    toast.success(text, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: 'light',
        transition: Slide,
        containerId: 'toaster',
    });
};
