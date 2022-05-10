import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import { SubjectContext } from '../../context/subjectContext';
import { Subject } from '../../../../../interfaces/api';

export const ActionsBody = ({ subject }: { subject: Subject }) => {
  const { setSubjectSelected, setDisplayModal } = useContext(SubjectContext);
  const { id } = subject;
  const navigate = useNavigate();

  return (
    <>
      <Button icon="pi pi-eye" className="p-button-sm p-button-raised p-button-primary mr-1" onClick={() => navigate(`/admin/users/${id}`)} />
      <Button
        icon="pi pi-pencil"
        className="p-button-sm p-button-raised p-button-primary mr-1"
        onClick={() => {
          setSubjectSelected(subject);
          setDisplayModal(true);
        }}
      />
      {/* <ButtonBlocked user={user} isUserLogged={isUserLogged} /> */}
    </>
  );
};

export const ActionsBodyTemplate = (subject: Subject) => <ActionsBody subject={subject} />;

export default {
  ActionsBody,
  ActionsBodyTemplate,
};
