import { useState } from 'react';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { useGetUsersQuery } from '../../../redux/user/user.api';
import { User } from '../../../interfaces/api';
import useAuth from '../../../hooks/useAuth';
import { GenderBodyTemplate, GenderRowFilterTemplate } from './components/columns/Gender';
import { ActiveBodyTemplate, ActiveRowFilterTemplate } from './components/columns/Active';
import { EmailBodyTemplate } from './components/columns/Email';
// eslint-disable-next-line import/no-cycle
import { ActionsBodyTemplate } from './components/columns/Actions';
// eslint-disable-next-line import/no-cycle
import { Header } from './components/Header';
// eslint-disable-next-line import/no-cycle
import { UserDialog } from './components/UserDialog';
import { UserContext } from './context/userContext';
import { initialFiltersValue } from './assets/assets';

const { Provider } = UserContext;

const UsersScreen = () => {
  const [ lazyParams, setLazyParams ] = useState<any>({
    first: 0,
    rows: 10,
    page: 0,
    sortField: '',
    sortOrder: null,
    filters: { ...initialFiltersValue },
  });

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ userSelected, setUserSelected ] = useState<User | null>(null);

  const { user: userAuth } = useAuth();

  const { data, isFetching } = useGetUsersQuery(
    {
      page: lazyParams.page + 1,
      sortField: lazyParams.sortField,
      sortOrder: lazyParams.sortOrder,
      filters: lazyParams.filters,
      rows: lazyParams.rows,
    },
  );

  const onPage = (event: DataTablePFSEvent) => {
    setLazyParams(event);
  };

  const onSort = (event: DataTablePFSEvent) => {
    setLazyParams(event);
  };

  const onFilter = (event: DataTablePFSEvent) => {
    // eslint-disable-next-line no-param-reassign
    event.first = 0;
    setLazyParams(event);
  };

  if (!data) {
    return (<div>Cargando</div>);
  }

  return (
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
            value={data?.data}
            lazy
            filterDisplay="row"
            header={<Header />}
            responsiveLayout="scroll"
            globalFilterFields={[ 'name', 'name.first', 'email', 'gender' ]}
            dataKey="id"
            paginator
            first={lazyParams.first}
            rows={lazyParams.rows}
            totalRecords={data?.total}
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
              filterElement={ActiveRowFilterTemplate}
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
  );
};

export default UsersScreen;
