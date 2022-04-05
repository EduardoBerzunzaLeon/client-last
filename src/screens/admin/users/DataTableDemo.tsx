import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import {
  Column,
  ColumnFilterApplyTemplateOptions,
  ColumnFilterClearTemplateOptions,
  ColumnFilterElementTemplateOptions,
} from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import './dataTableDemo.scss';
import { useGetUsersQuery } from '../../../redux/user/user.api';

export const DataTableFilterDemo = () => {
  const { data, isLoading } = useGetUsersQuery({
    page: '1',
    sortField: 'NU',
    sortOrder: '1',
    filters: {},
  });

  const [ customers1, setCustomers1 ] = useState<any>(null);
  const [ filters1, setFilters1 ] = useState<any>(null);

  const [ globalFilterValue1, setGlobalFilterValue1 ] = useState('');
  const representatives = [
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' },
  ];

  const statuses = [
    'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal',
  ];

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      fullname: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      'name.first': { value: null, matchMode: FilterMatchMode.IN },
      gender: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue1('');
  };

  useEffect(() => {
    if (data) {
      initFilters1();
      setCustomers1(data.data);
    }
  }, [ data ]);

  console.log(data);

  //   const formatDate = (value: any) => value.toLocaleDateString('en-US', {
  //     day: '2-digit',
  //     month: '2-digit',
  //     year: 'numeric',
  //   });

  const formatCurrency = (value: any) => value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const filteris1 = { ...filters1 };
    filteris1.global.value = value;

    setFilters1(filteris1);
    setGlobalFilterValue1(value);
  };

  const renderHeader1 = () => (
    <div className="flex justify-content-between">
      <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
      </span>
    </div>
  );

  const countryBodyTemplate = () => (
    <>
      <img
        alt="flag"
        src="/images/flag/flag_placeholder.png"
        onError={(e: any) => { e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'; }}
        className="flag flag-dz"
        width={30}
      />
      <span className="image-text">Algeria</span>
    </>
  );

  const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary" />;

  const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success" />;

  const filterFooterTemplate = () => <div className="px-3 pt-0 pb-3 text-center font-bold">Customized Buttons</div>;

  const representativeBodyTemplate = () => {
    const representative = {
      name: 'Ioni Bowcher',
      image: 'ionibowcher.png',
    };

    return (
      <>
        <img
          alt={representative.name}
          src={`images/avatar/${representative.image}`}
          onError={(e:any) => { e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'; }}
          width={32}
          style={{ verticalAlign: 'middle' }}
        />
        <span className="image-text">{representative.name}</span>
      </>
    );
  };

  const representativesItemTemplate = (option: any) => (
    <div className="p-multiselect-representative-option">
      <img
        alt={option.name}
        src={`images/avatar/${option.image}`}
        onError={(e:any) => { e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'; }}
        width={32}
        style={{ verticalAlign: 'middle' }}
      />
      <span className="image-text">{option.name}</span>
    </div>
  );

  const representativeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />;

  //   const dateBodyTemplate = () => formatDate('2015-09-13');

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;

  const balanceBodyTemplate = () => formatCurrency(70663);

  const balanceFilterTemplate = (options: ColumnFilterElementTemplateOptions) => <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;

  const statusBodyTemplate = () => <span className="customer-badge status-unqualified">unqualified</span>;

  const statusItemTemplate = () => <span className="customer-badge status-unqualified">unqualified</span>;

  const statusFilterTemplate = (options: ColumnFilterElementTemplateOptions) => <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;

  const activityBodyTemplate = () => <ProgressBar value={17} showValue={false} />;

  const activityFilterTemplate = (options: ColumnFilterElementTemplateOptions) => (
    <>
      <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3" />
      <div className="flex align-items-center justify-content-between px-2">
        <span>{options.value ? options.value[0] : 0}</span>
        <span>{options.value ? options.value[1] : 100}</span>
      </div>
    </>
  );

  const verifiedBodyTemplate = () => <i className={classNames('pi', { 'true-icon pi-check-circle': true, 'false-icon pi-times-circle': !true })} />;

  const verifiedFilterTemplate = (
    options: ColumnFilterElementTemplateOptions,
  ) => <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />;

  const header1 = renderHeader1();

  return (
    <div className="datatable-filter-demo">
      <div className="card">
        <h5>Filter Menu</h5>
        <p>Filters are displayed in an overlay.</p>
        <DataTable
          value={customers1}
          totalRecords={data?.total ?? 10}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          filters={filters1}
          filterDisplay="menu"
          loading={isLoading}
          responsiveLayout="scroll"
          globalFilterFields={[ 'fullname', 'email', 'name.first', 'gender', 'active' ]}
          header={header1}
          emptyMessage="No customers found."
        >
          <Column field="fullname" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
          <Column
            header="Email"
            filterField="email"
            style={{ minWidth: '12rem' }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by email"
            filterClear={filterClearTemplate}
            filterApply={filterApplyTemplate}
            filterFooter={filterFooterTemplate}
          />
          <Column
            header="First"
            filterField="name.first"
            showFilterMatchModes={false}
            filterMenuStyle={{ width: '14rem' }}
            style={{ minWidth: '14rem' }}
            body={representativeBodyTemplate}
            filter
            filterElement={representativeFilterTemplate}
          />
          <Column
            header="Sex"
            filterField="gender"
            dataType="date"
            style={{ minWidth: '10rem' }}
            filter
            filterElement={dateFilterTemplate}
          />
          <Column header="Balance" filterField="balance" dataType="numeric" style={{ minWidth: '10rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
          <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
          <Column field="activity" header="Activity" showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
          <Column field="verified" header="Verified" dataType="boolean" bodyClassName="text-center" style={{ minWidth: '8rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedFilterTemplate} />
        </DataTable>
      </div>

    </div>
  );
};

export default DataTableFilterDemo;
