import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { exportExcel } from '../../utils/exports/exportExcel';

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
  const { data } = hookRTK(null, { skip });

  useEffect(() => {
    if (data && isLoading) {
      const finished = exportExcel(data.data, fileName, headers);
      if (finished) {
        setIsLoading(false);
      }
    }
  }, [ data, isLoading, headers, fileName ]);

  const handleClick = () => {
    if (skip) {
      setSkip(false);
    }
    setIsLoading(true);
  };

  return (
    <Button
      type="button"
      icon="pi pi-file-excel"
      label={label}
      className="p-button p-button-success m-2"
      loading={isLoading}
      onClick={handleClick}
    />
  );
};

ExcelButton.defaultProps = {
  label: 'Exportar Excel',
};

export default ExcelButton;
