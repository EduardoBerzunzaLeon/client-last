import React, { useContext } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { initialFiltersValue } from '../assets/assets';
import { UserContext } from '../context/userContext';

export const Header = () => {
  const {
    lazyParams, setLazyParams, setFilterValue, setDisplayModal,
  } = useContext(UserContext);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilterValue('global', value);
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
          icon="pi pi-user-plus"
          label="Crear Usuario"
          className="p-button-outlined p-button-success m-2"
          onClick={() => setDisplayModal(true)}
        />
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
