import { Header as GenericHeader } from '../../datatable';
import { initialFiltersValue } from '../assets';
import { StudentContext } from '../context/studentContext';

export const Header = () => (
  <GenericHeader
    context={StudentContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Estudiante"
    module="professor"
  />
);

export default Header;
