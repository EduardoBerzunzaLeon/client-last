import { ExcelButtonSubjects } from './ExcelButtonSubjects';
import { Header as GenericHeader } from '../../datatable';
import { initialFiltersValue } from '../assets';
import { SubjectContext } from '../context/subjectContext';

export const Header = () => (
  <GenericHeader
    context={SubjectContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Materia"
    module="subject"
  >
    {() => (
      <ExcelButtonSubjects />
    )}
  </GenericHeader>
);

export default Header;
