import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import { Button } from 'primereact/button';

import { ButtonBlocked } from '../ButtonBlocked';
import { User } from '../../../../../interfaces/api';
import { UserContext } from '../../context/userContext';

export const ActionsBody = ({ user }: {user: User}) => {
  const { userAuth, setUserSelected, setDisplayModal } = useContext(UserContext);
  const { id } = user;
  const isUserLogged = id === userAuth?.id;
  const navigate = useNavigate();

  return (
    <>
      <Button icon="pi pi-eye" className="p-button-sm p-button-raised p-button-primary mr-1" onClick={() => navigate(`/admin/users/${id}`)} />
      <Button
        icon="pi pi-pencil"
        className={classNames('p-button-sm', 'p-button-raised', 'p-button-primary', 'mr-1', { 'p-disabled': isUserLogged })}
        onClick={() => {
          setUserSelected(user);
          setDisplayModal(true);
        }}
      />
      <ButtonBlocked user={user} isUserLogged={isUserLogged} />
    </>
  );
};

export const ActionsBodyTemplate = (user: User) => <ActionsBody user={user} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
