import { useRef } from 'react';

import { MessageProps } from '../interfaces/ui/hooks/hooksInterface';

const useToast = () => {
  const toast = useRef<any>(null);

  const showGenericToast = (severity: string) => (
    {
      summary,
      detail,
      life = 3000,
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

  const showError = showGenericToast('error');
  const showWarn = showGenericToast('warn');
  const showSuccess = showGenericToast('success');
  const showInfo = showGenericToast('info');

  return {
    toast,
    showError,
    showWarn,
    showSuccess,
    showInfo,
  };
};

export default useToast;
