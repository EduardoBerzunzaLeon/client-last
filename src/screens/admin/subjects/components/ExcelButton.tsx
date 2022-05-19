import { Button } from 'primereact/button';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { useGetSubjectsForExcelQuery } from '../../../../redux/subject/subject.api';

export const ExcelButton = () => {
  const [ skip, setSkip ] = useState(true);
  const { data, isLoading } = useGetSubjectsForExcelQuery(null, { skip });

  console.log({ data, isLoading });

  const saveAsExcelFile = (buffer: any, fileName: string) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const dataset = new Blob([ buffer ], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(dataset, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
      }
    });
  };
  const exportExcel = () => {
    if (data) {
      const worksheet = XLSX.utils.json_to_sheet(data.data);
      const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: [ 'data' ]};
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      saveAsExcelFile(excelBuffer, 'products');
    }
  };

  const handleClick = () => {
    setSkip(false);
    exportExcel();
  };

  return (
    <Button
      type="button"
      icon="pi pi-file-excel"
      label="Exportar Excel"
      className="p-button p-button-success m-2"
      onClick={handleClick}
    />
  );
};

export default ExcelButton;
