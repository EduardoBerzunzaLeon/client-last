import React, { useContext } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { initialFiltersValue } from '../assets/assets';
import { SubjectContext } from '../context/subjectContext';
import { ExcelButtonSubjects } from './ExcelButtonSubjects';

export const Header = () => {
  const { lazyParams, setLazyParams, setDisplayModal } = useContext(SubjectContext);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLazyParams((prev: any) => ({
      ...prev,
      filters: {
        ...prev.filters,
        global: {
          ...prev.filters.global,
          value,
        },
      },
    }));
  };

  return (
    <div className="flex justify-content-between flex-wrap">
      <div>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar Filtros"
          className="p-button-outlined m-2"
          onClick={() => setLazyParams((prev: any) => ({
            ...prev,
            filters: { ...initialFiltersValue },
          }))}
        />
        <Button
          type="button"
          icon="pi pi-plus"
          label="Crear Materia"
          className="p-button-outlined p-button-success m-2"
          onClick={() => setDisplayModal(true)}
        />
        <ExcelButtonSubjects />
      </div>
      <span className="p-input-icon-left m-2 overflow-hidden">
        <i className="pi pi-search" />
        <InputText
          value={lazyParams.filters.global.value}
          onChange={onGlobalFilterChange}
          placeholder="Búsqueda Global"
        />
      </span>
    </div>
  );
};

export default Header;
