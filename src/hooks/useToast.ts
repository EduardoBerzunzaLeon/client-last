import { useRef } from 'react';

interface Props {
  summary: string,
  detail: string,
  life?: number
}

const useToast = () => {
  const toast = useRef<any>(null);

  const showGenericToast = (severity: string) => (
    {
      summary,
      detail,
      life = 3000,
    }: Props,
  ): void => {
    toast.current.show({
      severity,
      summary,
      detail,
      life,
    });
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
