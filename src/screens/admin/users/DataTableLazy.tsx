import { useState } from 'react';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
// import { SplitButton } from 'primereact/splitbutton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import { useGetUsersQuery, useUpdateBlockedUserAdminMutation } from '../../../redux/user/user.api';
import { User } from '../../../interfaces/api';
import { Divider } from '../../../components/Divider/Divider';
// eslint-disable-next-line import/no-cycle
import { UserDataForm } from './components/UserDataForm';
import useAuth from '../../../hooks/useAuth';
import { AdminPasswordForm } from './components/AdminPasswordForm';
import useToast from '../../../hooks/useToast';
import { processError } from '../../../utils/form/handlerErrorsForms';
// import { User } from '../../../interfaces/api';

const initialFiltersValue = {
  global: { value: '', matchMode: FilterMatchMode.CONTAINS },
  fullname: { value: null, matchMode: FilterMatchMode.CONTAINS },
  'name.first': { value: null, matchMode: FilterMatchMode.CONTAINS },
  email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  gender: { value: null, matchMode: FilterMatchMode.CONTAINS },
  active: { value: null, matchMode: FilterMatchMode.EQUALS },
};

const DataTableLazy = () => {
  const [ lazyParams, setLazyParams ] = useState<any>({
    first: 0,
    rows: 2,
    page: 0,
    sortField: '',
    sortOrder: null,
    filters: { ...initialFiltersValue },
  });

  const [ displayModal, setDisplayModal ] = useState(false);
  const [ userSelected, setUserSelected ] = useState<User | null>(null);
  const { toast, showError, showSuccess } = useToast();

  const [ updateBlocked, { isLoading: isLoadingMutation }] = useUpdateBlockedUserAdminMutation();

  const navigate = useNavigate();

  const { user: userAuth } = useAuth();

  const genders = [ 'M', 'F' ];

  const statusItemTemplate = (option: string) => <span className="customer-badge status-success">{option}</span>;

  const statusRowFilterTemplate = (options: any) => <Dropdown value={options.value} options={genders} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={statusItemTemplate} placeholder="Elige el sexo" className="p-column-filter" showClear />;

  const { data, isFetching } = useGetUsersQuery(
    {
      page: lazyParams.page + 1,
      sortField: lazyParams.sortField,
      sortOrder: lazyParams.sortOrder,
      filters: lazyParams.filters,
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

  const onGlobalFilterChange = (e: any) => {
    const { value } = e.target;
    setLazyParams({
      ...lazyParams,
      filters: {
        ...lazyParams.filters,
        global: {
          ...lazyParams.filters.global,
          value,
        },
      },
    });
  };

  const renderHeader = () => (
    <div className="flex justify-content-between flex-wrap">
      <div>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar Filtros"
          className="p-button-outlined m-2"
          onClick={() => setLazyParams({
            ...lazyParams,
            filters: { ...initialFiltersValue },
          })}
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
          placeholder="Keyword Search"
        />
      </span>
    </div>
  );

  const verifiedBodyTemplate = (rowData: User) => <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.active, 'false-icon pi-times-circle': !rowData.active })} />;

  const verifiedRowFilterTemplate = (options: any) => (
    <TriStateCheckbox
      value={options.value}
      onChange={(e) => options.filterApplyCallback(e.value)}
    />
  );

  const actionBodyTemplate = (rowData: User) => {
    const isUserLogged = rowData.id === userAuth?.id;

    return (
      <>
        <Button icon="pi pi-eye" className="p-button-sm p-button-raised p-button-primary mr-1" onClick={() => navigate(`/admin/users/${rowData?.id}`)} />
        <Button
          icon="pi pi-pencil"
          className={classNames('p-button-sm', 'p-button-raised', 'p-button-primary', 'mr-1', { 'p-disabled': isUserLogged })}
          onClick={() => {
            setUserSelected(rowData);
            setDisplayModal(true);
          }}
        />
        <Button
          icon={`pi pi-${rowData.blocked ? 'lock' : 'lock-open'}`}
          loading={isLoadingMutation}
          className={classNames('p-button-sm', 'p-button-raised', { 'p-disabled': isUserLogged, 'p-button-danger': rowData.blocked, 'p-button-success': !rowData.blocked })}
          onClick={async () => {
            try {
              const { id, blocked } = rowData;
              await updateBlocked({ id, blocked: !blocked }).unwrap();
              showSuccess({ detail: 'Se cambio el status con éxito' });
            } catch (error) {
              processError({ error, showError });
            }
          }}
        />

      </>
    );
  };

  const header = renderHeader();
  if (!data) {
    return (<div>Cargando</div>);
  }

  return (
    <div>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          value={data?.data}
          lazy
          filterDisplay="row"
          header={header}
          responsiveLayout="scroll"
          globalFilterFields={[ 'name', 'name.first', 'email', 'gender' ]}
          dataKey="id"
          paginator
          first={lazyParams.first}
          rows={2}
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
            field="fullname"
            header="Name"
            sortable
            showFilterMenu={false}
            filter
            filterPlaceholder="Search by name"
          />
          <Column
            header="First"
            filterField="name.first"
            field="name.first"
            sortable
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by country"
          />
          <Column
            header="Email"
            field="email"
            filterField="email"
            sortable
            filter
            showFilterMenu={false}
            filterPlaceholder="Search by company"
          />
          <Column
            field="gender"
            header="Sex"
            filter
            filterPlaceholder="Search by representative"
            filterElement={statusRowFilterTemplate}
            showFilterMenu={false}
          />
          <Column
            field="active"
            header="Active"
            dataType="boolean"
            style={{ minWidth: '6rem' }}
            body={verifiedBodyTemplate}
            filter
            filterElement={verifiedRowFilterTemplate}
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: '12rem' }}
          />
        </DataTable>
      </div>
      <Dialog
        header={userSelected ? 'Editar Usuario' : 'Crear Usuario'}
        className="shadow-5 w-11 md:w-6 lg:w-5"
        modal
        visible={displayModal}
        onHide={() => {
          setUserSelected(null);
          setDisplayModal(false);
        }}
      >
        <TabView>
          <TabPanel header="Datos Personales">
            <Divider text="Información Personal" icon="user" />
            <UserDataForm user={userSelected} />
          </TabPanel>
          {
           userSelected && (
           <TabPanel header="Cambiar contraseña">

             <AdminPasswordForm userId={userSelected.id} />
           </TabPanel>
           )
          }

        </TabView>
      </Dialog>
    </div>
  );
};

export default DataTableLazy;
