import { useEffect, useState } from 'react';

import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
// eslint-disable-next-line import/no-unresolved
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/dist/query';

import { useToast } from '../../../hooks';
import { exportExcel } from '../../../utils';

interface Props {
    hookRTK: UseQuery<QueryDefinition<any, any, any, any>>;
    headers: string[][],
    fileName: string,
    label?: string,
    hookParams?: string,
}

export const ExcelButton = ({
  hookRTK, headers, fileName, label, hookParams,
}: Props) => {
  const [ skip, setSkip ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const { data, isError } = hookRTK(hookParams, { skip });

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
  hookParams: null,
};

export default ExcelButton;
