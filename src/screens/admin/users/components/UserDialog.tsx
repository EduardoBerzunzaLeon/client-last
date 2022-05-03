import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';

import { AdminPasswordForm } from './AdminPasswordForm';
import { Divider } from '../../../../components/divider/Divider';
import { UserContext } from '../context/userContext';
import { UserDataForm } from './UserDataForm';

export const UserDialog = () => {
  const {
    userSelected, displayModal, setUserSelected, setDisplayModal,
  } = useContext(UserContext);

  return (
    <Dialog
      header={userSelected ? 'Editar Usuario' : 'Crear Usuario'}
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      visible={displayModal}
      onHide={() => {
        setUserSelected(undefined);
        setDisplayModal(false);
      }}
    >
      <TabView>
        <TabPanel header="Datos Personales">
          <Divider text="Información Personal" icon="user" />
          <UserDataForm user={userSelected} />
        </TabPanel>
        {
           userSelected && (
           <TabPanel header="Cambiar contraseña">
             <AdminPasswordForm userId={userSelected.id} />
           </TabPanel>
           )
          }

      </TabView>
    </Dialog>
  );
};

export default UserDialog;
