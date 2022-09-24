// import { Toast } from 'primereact/toast';
import { createContext } from 'react';
import { MessageProps } from '../../interfaces';

type ShowMethod = ({ detail, life }: MessageProps) => void;

interface ToastContextProps {
    showError: ShowMethod,
    showWarn: ShowMethod,
    showSuccess: ShowMethod,
    showInfo: ShowMethod,
}

export const ToastContext = createContext({} as ToastContextProps);

export default ToastContext;
