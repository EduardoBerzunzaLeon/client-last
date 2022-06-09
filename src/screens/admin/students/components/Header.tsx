import { Header as GenericHeader } from '../../../../components/datatable/Header';
import { initialFiltersValue } from '../assets/assets';
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
