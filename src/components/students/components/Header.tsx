import { Header as GenericHeader } from '../../datatable';
import { initialFiltersValue } from '../assets';
import { StudentContext } from '../context/studentContext';
import { ExcelButtonStudents } from './ExcelButtonStudents';

export const Header = () => (
  <GenericHeader
    context={StudentContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Estudiante"
    module="professor"
  >
    {({ paginatorURL }) => (
      <ExcelButtonStudents paginatorURL={paginatorURL} />
    )}
  </GenericHeader>
);

export default Header;
