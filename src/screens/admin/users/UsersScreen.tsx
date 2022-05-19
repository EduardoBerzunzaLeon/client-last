import { useState } from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import { ActionsBodyTemplate } from './components/columns/Actions';
import { ActiveBodyTemplate } from './components/columns/Active';
import { EmailBodyTemplate } from './components/columns/Email';
import { GenderBodyTemplate, GenderRowFilterTemplate } from './components/columns/Gender';
import { Header } from './components/Header';
import { initialFiltersValue } from './assets/assets';
import { SpinnerRTK } from '../../../components/spinnerRTK/SpinnerRTK';
import { TriStateFilterTemplate } from '../../../components/datatable/TriStateFilterTemplate';
import { User } from '../../../interfaces/api';
import { UserContext } from './context/userContext';
import { UserDialog } from './components/UserDialog';

import { useAuth } from '../../../hooks/useAuth';
import { useGetUsersQuery } from '../../../redux/user/user.api';
import { useLazyParams } from '../../../hooks/useLazyParams';

const { Provider } = UserContext;

export const UsersScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    onPage,
    onSort,
    onFilter,
    paginatorValues,
  } = useLazyParams(initialFiltersValue);

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ userSelected, setUserSelected ] = useState<User>();
  const { user: userAuth } = useAuth();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetUsersQuery(paginatorValues);

  return (
    <SpinnerRTK
      data={data}
      error={error}
      isError={isError}
      isLoading={isLoading}
      messageError="No se encontró usuarios"
      messageLoading="Cargando Usuarios"
    >
      {
        ({ data: dataSend }) => (
          <Provider value={{
            displayModal,
            lazyParams,
            userAuth,
            userSelected,
            setDisplayModal,
            setLazyParams,
            setUserSelected,
          }}
          >
            <div>
              <div className="card">
                <DataTable
                  value={dataSend}
                  lazy
                  filterDisplay="row"
                  header={<Header />}
                  responsiveLayout="scroll"
                  globalFilterFields={[ 'name.first', 'name.last', 'email', 'gender' ]}
                  dataKey="id"
                  paginator
                  first={lazyParams.first}
                  rows={lazyParams.rows}
                  totalRecords={7}
                  onPage={onPage}
                  onSort={onSort}
                  sortField={lazyParams.sortField}
                  sortOrder={lazyParams.sortOrder}
                  onFilter={onFilter}
                  filters={lazyParams.filters}
                  loading={isFetching}
                >
                  <Column
                    header="Nombre"
                    field="name.first"
                    sortable
                    showFilterMenu={false}
                    filter
                    filterField="name.first"
                    filterPlaceholder="Buscar por nombre"
                  />
                  <Column
                    header="Apellido"
                    filterField="name.last"
                    field="name.last"
                    sortable
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar por apellido"
                  />
                  <Column
                    header="Email"
                    field="email"
                    filterField="email"
                    body={EmailBodyTemplate}
                    sortable
                    filter
                    showFilterMenu={false}
                    filterPlaceholder="Buscar por correo"
                  />
                  <Column
                    field="gender"
                    header="Sexo"
                    filter
                    filterPlaceholder="Buscar por sexo"
                    body={GenderBodyTemplate}
                    filterElement={GenderRowFilterTemplate}
                    showFilterMenu={false}
                  />
                  <Column
                    field="active"
                    header="Activo"
                    dataType="boolean"
                    style={{ minWidth: '6rem' }}
                    body={ActiveBodyTemplate}
                    filter
                    filterElement={TriStateFilterTemplate}
                  />
                  <Column
                    body={ActionsBodyTemplate}
                    exportable={false}
                    style={{ minWidth: '12rem' }}
                  />
                </DataTable>
              </div>
              <UserDialog />
            </div>
          </Provider>
        )
      }
    </SpinnerRTK>
  );
};

export default UsersScreen;
