import { DropdownFilterParams } from 'primereact/dropdown';
import { useState, useEffect } from 'react';

interface SelectItem {
    disabled?: boolean,
    selectItemId?: string,
  }

  interface Props<T>{
      field: keyof T,
      data?: any[],
      emptyDataMessage?: string,
  }

export const useDropdownFilter = <T>({
  field,
  data,
  emptyDataMessage = 'No se encontró información',
} : Props<T>) => {
  const [ cleanData, setCleanData ] = useState<SelectItem[]>(data ?? []);

  useEffect(() => {
    if (data) {
      setCleanData(data);
    }
  }, [ data ]);

  const onFilter = (e: DropdownFilterParams) => {
    const { filter } = e;

    if (!filter) {
      setCleanData(data ?? []);
    } else {
      const filteredData = data?.filter((record) => (record[field]?.toString()
        .toLowerCase()
        .includes(filter.toLocaleLowerCase()))) ?? [];

      if (filteredData.length) {
        setCleanData(filteredData);
      } else {
        setCleanData([{
          [field]: emptyDataMessage,
          selectItemId: 'notFound',
          disabled: true,
        }]);
      }
    }
  };

  return {
    cleanData,
    setCleanData,
    onFilter,
  };
};

export default useDropdownFilter;
