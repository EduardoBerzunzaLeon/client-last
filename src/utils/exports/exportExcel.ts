import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { BufferSource } from 'stream/web';

type BlobPart = string | BufferSource | Blob;

const saveAsExcelFile = (buffer: BlobPart, fileName: string) => {
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';
  const dataset = new Blob([ buffer ], {
    type: EXCEL_TYPE,
  });

  saveAs(dataset, `${fileName}_export_${new Date().toJSON()}${EXCEL_EXTENSION}`);
  return true;
};

export const exportExcel = (data: unknown[], fileName: string, header?: any[][]) => {
  const worksheet = XLSX.utils.json_to_sheet(data);

  if (header) {
    XLSX.utils.sheet_add_aoa(worksheet, header, { origin: 'A1' });
  }
  const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: [ 'data' ]};
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  return saveAsExcelFile(excelBuffer, fileName);
};

export default {
  exportExcel,
};
