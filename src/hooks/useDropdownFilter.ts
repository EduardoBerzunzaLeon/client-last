import { DropdownFilterParams } from 'primereact/dropdown';
import { useState, useEffect } from 'react';

interface SelectItem {
    disabled?: boolean,
    selectItemId?: string,
  }

  interface Props<T>{
      field: keyof T,
      data?: any[],
  }

export const useDropdownFilter = <T>({
  field,
  data,
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
