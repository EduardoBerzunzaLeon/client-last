import { Toast } from 'primereact/toast';
import { FC } from 'react';
import { useToast } from '../../hooks';
import { ToastContext } from './ToastContext';

export const ToastProvider: FC = ({ children }) => {
  const {
    toast, ...showMethods
  } = useToast();

  return (
    <ToastContext.Provider value={showMethods}>
      <>
        <Toast ref={toast} />
        { children }
      </>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
