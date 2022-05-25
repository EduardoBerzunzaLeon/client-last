import { ExcelButtonSubjects } from './ExcelButtonSubjects';
import { Header as GenericHeader } from '../../../../components/datatable/Header';
import { initialFiltersValue } from '../assets/assets';
import { SubjectContext } from '../context/subjectContext';

export const Header = () => (
  <GenericHeader
    context={SubjectContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Materia"
  >
    <ExcelButtonSubjects />
  </GenericHeader>
);

export default Header;
