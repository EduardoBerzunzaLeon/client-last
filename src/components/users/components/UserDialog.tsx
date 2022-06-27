import { useContext } from 'react';

import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';

import { AdminPasswordForm } from './AdminPasswordForm';
import { UserContext } from '../context/userContext';
import { UserDataForm } from './UserDataForm';

import { useTitle } from '../../../../hooks';

export const UserDialog = () => {
  const {
    userSelected, displayModal, setUserSelected, setDisplayModal,
  } = useContext(UserContext);

  const { title } = useTitle({
    createTitle: 'Crear Usuario',
    updateTitle: 'Editar Usuario',
    displayModal,
    hasEntitySelected: !!userSelected,
  });

  return (
    <Dialog
      header={title}
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
          <UserDataForm user={userSelected} buttonLabel={title} />
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
