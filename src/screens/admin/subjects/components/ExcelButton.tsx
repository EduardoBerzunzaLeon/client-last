import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useGetSubjectsForExcelQuery } from '../../../../redux/subject/subject.api';

export const ExcelButton = () => {
  const [ skip, setSkip ] = useState(true);
  const [ isLoading, setIsLoading ] = useState(false);
  const { data } = useGetSubjectsForExcelQuery(null, { skip });

  useEffect(() => {
    console.log({ data, isLoading });
    if (data && isLoading) {
      // setIsLoading(true);
      // eslint-disable-next-line no-use-before-define
      exportExcel();
      // exportExcel();
    }
  }, [ data, isLoading ]);

  const saveAsExcelFile = (buffer: any, fileName: string) => {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';
    const dataset = new Blob([ buffer ], {
      type: EXCEL_TYPE,
    });

    saveAs(dataset, `${fileName}_export_${new Date().getTime()}${EXCEL_EXTENSION}`);
    setIsLoading(false);
  };
  const exportExcel = () => {
    const header = [[ 'ID', 'Nombre', 'Semestre', 'Deprecado', 'Materias Requeridas', 'Materias Correlativas', 'Creditos', 'Horas Practicas', 'Horas Teóricas', 'Horas Totales', ' Núcleo Academico' ]];
    const worksheet = XLSX.utils.json_to_sheet(data!.data);
    XLSX.utils.sheet_add_aoa(worksheet, header, { origin: 'A1' });

    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: [ 'data' ]};
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAsExcelFile(excelBuffer, 'materias');
  };

  const handleClick = () => {
    if (skip) {
      setSkip(false);
    }
    setIsLoading(true);
  };

  return (
    <Button
      type="button"
      icon="pi pi-file-excel"
      label="Exportar Excel"
      className="p-button p-button-success m-2"
      loading={isLoading}
      onClick={handleClick}
    />
  );
};

export default ExcelButton;
