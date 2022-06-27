import { useEffect, useState } from 'react';

import { Button } from 'primereact/button';

import { Toast } from 'primereact/toast';
import { useToast } from '../../../hooks';
import { exportExcel } from '../../../utils';

interface Props {
    hookRTK: any;
    headers: any[][],
    fileName: string,
    label?: string,
}

export const ExcelButton = ({
  hookRTK, headers, fileName, label,
}: Props) => {
  const [ skip, setSkip ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const { data, isError } = hookRTK(null, { skip });

  const { toast, showError } = useToast();

  useEffect(() => {
    if (data && isLoading) {
      const finished = exportExcel(data.data, fileName, headers);
      if (finished) {
        setIsLoading(false);
      }
    }

    if (isError && isLoading) {
      showError({ detail: 'Ocurrio un error, favor de intentarlo más tarde' });
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ data, isLoading, headers, fileName, isError ]);

  const handleClick = () => {
    if (skip) {
      setSkip(false);
    }
    setIsLoading(true);
  };

  return (
    <>
      <Toast ref={toast} />
      <Button
        type="button"
        icon="pi pi-file-excel"
        label={label}
        className="p-button p-button-success m-2"
        loading={isLoading}
        onClick={handleClick}
      />
    </>
  );
};

ExcelButton.defaultProps = {
  label: 'Exportar Excel',
};

export default ExcelButton;
