import { useRef } from 'react';

import { MessageProps } from '../interfaces/ui/hooks/hooksInterface';

const useToast = () => {
  const toast = useRef<any>(null);

  const showGenericToast = (severity: string, summary: string) => (
    {
      detail,
      life = 2000,
    }: MessageProps,
  ): void => {
    if (toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
        life,
      });
    }
  };

  const showError = showGenericToast('error', 'Error');
  const showWarn = showGenericToast('warn', 'Advertencia');
  const showSuccess = showGenericToast('success', 'Éxito');
  const showInfo = showGenericToast('info', 'Aviso');

  return {
    toast,
    showError,
    showWarn,
    showSuccess,
    showInfo,
  };
};

export default useToast;
