import { useContext, useEffect, useState } from 'react';

import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';

import { AdminPasswordForm } from './AdminPasswordForm';
import { UserContext } from '../context/userContext';
import { UserDataForm } from './UserDataForm';

export const UserDialog = () => {
  const {
    userSelected, displayModal, setUserSelected, setDisplayModal,
  } = useContext(UserContext);

  const [ title, setTitle ] = useState('');

  useEffect(() => {
    (displayModal && !userSelected)
      && setTitle('Crear Usuario');

    (displayModal && userSelected)
      && setTitle('Editar Usuario');
  }, [ displayModal, userSelected ]);

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
