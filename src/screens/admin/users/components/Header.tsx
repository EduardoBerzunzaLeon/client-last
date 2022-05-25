import { Header as GenericHeader } from '../../../../components/datatable/Header';
import { initialFiltersValue } from '../assets/assets';
import { UserContext } from '../context/userContext';

export const Header = () => (
  <GenericHeader
    context={UserContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Materia"
  />
);

export default Header;
