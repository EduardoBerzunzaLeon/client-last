import { useState } from 'react';

import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

import {
  ActiveBody,
  EmailBody,
  GenderBody,
  GenderFilter,
  TriStateFilter,
} from '../../../components/datatable';
import {
  ActionsBodyTemplate,
  Header,
  initialFiltersValue,
  UserContext,
  UserDialog,
} from '../../../components/users';
import { SpinnerRTK, HeaderAdmin } from '../../../components/ui';
import { User } from '../../../interfaces';

import { useAuth, useLazyParams } from '../../../hooks';
import { useGetUsersQuery } from '../../../redux/user/user.api';

const { Provider } = UserContext;

export const UsersScreen = () => {
  const {
    lazyParams,
    setLazyParams,
    setFilterValue,
    onPage,
    onSort,
    onFilter,
    paginatorURL,
  } = useLazyParams(initialFiltersValue, 'users');

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ userSelected, setUserSelected ] = useState<User>();
  const { user: userAuth } = useAuth();

  const {
    data, isError, error, isLoading, isFetching,
  } = useGetUsersQuery(paginatorURL);

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
        ({ data: dataSend, total }) => (
          <Provider value={{
            displayModal,
            lazyParams,
            userAuth,
            userSelected,
            setDisplayModal,
            setLazyParams,
            setFilterValue,
            setUserSelected,
          }}
          >
            <div>
              <HeaderAdmin position="users/" title="Gestionar Usuarios" hasBreadcumbs />
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
                  totalRecords={total}
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
                    body={EmailBody}
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
                    body={GenderBody}
                    filterElement={GenderFilter}
                    showFilterMenu={false}
                  />
                  <Column
                    field="active"
                    header="Activo"
                    dataType="boolean"
                    style={{ minWidth: '6rem' }}
                    body={ActiveBody}
                    filter
                    filterElement={TriStateFilter}
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
