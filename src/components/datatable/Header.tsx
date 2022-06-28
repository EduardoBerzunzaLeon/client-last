import React, { ReactElement, useContext } from 'react';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {
  DataTablePFSEvent,
  DataTableFilterMeta,
  DataTableFilterMetaData,
} from 'primereact/datatable';

import { ModulesName } from '../authorization/permissions';
import { PermissionsGate } from '../authorization/PermissionGate';

interface HeaderGenericContext {
    lazyParams: DataTablePFSEvent,
    setLazyParams: (value: React.SetStateAction<any>) => void,
    setFilterValue: (fieldName: string, value: any) => void,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
}

interface Props<T> {
    context: React.Context<T>,
    initialFiltersValue: DataTableFilterMeta,
    createTitle: string,
    module: ModulesName,
    children?: (restDataContext: Omit<T, 'lazyParams' | 'setLazyParams' | 'setFilterValue' | 'setDisplayModal'>) => ReactElement | ReactElement[],
}

export const Header = <T extends HeaderGenericContext>({
  context, initialFiltersValue, children, createTitle, module,
}: Props<T>) => {
  const {
    lazyParams, setLazyParams, setFilterValue, setDisplayModal, ...restDataContext
  } = useContext(context);

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
        <PermissionsGate
          module={module}
          permission="canCreate"
        >
          <Button
            type="button"
            icon="pi pi-plus"
            label={createTitle}
            className="p-button-outlined p-button-success m-2"
            onClick={() => setDisplayModal(true)}
          />
        </PermissionsGate>
        { children && children(restDataContext) }
      </div>
      <span className="p-input-icon-left m-2 overflow-hidden">
        <i className="pi pi-search" />
        <InputText
          value={(lazyParams.filters.global as DataTableFilterMetaData).value}
          onChange={onGlobalFilterChange}
          placeholder="Búsqueda Global"
        />
      </span>
    </div>
  );
};

Header.defaultProps = {
  children: undefined,
};

export default Header;
