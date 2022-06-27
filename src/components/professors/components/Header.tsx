import { ExcelButtonProfessors } from './ExcelButtonProfessors';
import { Header as GenericHeader } from '../../datatable';
import { initialFiltersValue } from '../assets';
import { ProfessorContext } from '../context/professorContext';

export const Header = () => (
  <GenericHeader
    context={ProfessorContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Tutor"
    module="professor"
  >
    <ExcelButtonProfessors />
  </GenericHeader>
);

export default Header;
