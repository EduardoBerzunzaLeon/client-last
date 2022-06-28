import { Header as GenericHeader } from '../../datatable';
import { initialFiltersValue } from '../assets';
import { UserContext } from '../context/userContext';

export const Header = () => (
  <GenericHeader
    context={UserContext}
    initialFiltersValue={initialFiltersValue}
    createTitle="Crear Usuario"
    module="user"
  />
);

export default Header;
