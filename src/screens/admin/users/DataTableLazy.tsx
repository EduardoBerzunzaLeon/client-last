import { useState } from 'react';
import { DataTable, DataTablePFSEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useGetUsersQuery } from '../../../redux/user/user.api';
// import { User } from '../../../interfaces/api';

const DataTableLazy = () => {
  const [ lazyParams, setLazyParams ] = useState<any>({
    first: 0,
    rows: 2,
    page: 0,
    sortField: '',
    sortOrder: null,
    filters: {
      global: { value: '', matchMode: FilterMatchMode.CONTAINS },
      fullname: { value: '', matchMode: 'contains' },
      'name.first': { value: '', matchMode: 'contains' },
      email: { value: '', matchMode: 'contains' },
      gender: { value: '', matchMode: 'contains' },
    },
  });

  const { data, isFetching } = useGetUsersQuery(
    {
      page: lazyParams.page + 1,
      sortField: lazyParams.sortField,
      sortOrder: lazyParams.sortOrder,
    },
  );

  const onPage = (event: DataTablePFSEvent) => {
    setLazyParams(event);
  };

  console.log(lazyParams);
  const onSort = (event: DataTablePFSEvent) => {
    setLazyParams(event);
  };

  const onFilter = (event: DataTablePFSEvent) => {
    // eslint-disable-next-line no-param-reassign
    event.first = 0;
    console.log(event);
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
    <div className="flex justify-content-between">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={() => console.log('clearMe neni')} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={lazyParams.filters.global.value} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
      </span>
    </div>
  );

  const header = renderHeader();

  //   const representativeBodyTemplate = (rowData:User) => (
  //     <>
  //       <img
  //         alt={rowData.name.first}
  //         src={rowData.avatar}
  //         onError={(e: any) => { e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'; }}
  //         width={32}
  //         style={{ verticalAlign: 'middle' }}
  //       />
  //       <span className="image-text">{rowData.fullname}</span>
  //     </>
  //   );

  return (
    <div>
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
          <Column field="fullname" header="Name" sortable filter filterPlaceholder="Search by name" />
          <Column
            header="First"
            filterField="name.first"
            field="name.first"
            sortable
            filter
            filterPlaceholder="Search by country"
          />
          <Column
            header="Email"
            field="email"
            filterField="email"
            sortable
            filter
            filterPlaceholder="Search by company"
          />
          <Column field="gender" header="Sex" filter filterPlaceholder="Search by representative" />
        </DataTable>
      </div>
    </div>
  );
};

export default DataTableLazy;
