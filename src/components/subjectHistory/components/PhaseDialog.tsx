import { useContext, useMemo } from 'react';

import { Dialog } from 'primereact/dialog';

import { SubjectHistoryContext } from '../context/subjectHistoryContext';
import { useTitle } from '../../../hooks';
import { InitialValues, SubjectHistory, UserContext } from '../../../interfaces';
import { PhaseDataForm } from './PhaseDataForm';

const generateInitialValue = (
  user: UserContext,
  phase?: SubjectHistory,
): InitialValues => {
  if (!phase) {
    return {
      semester: user.semester,
      userId: user.id,
      phaseStatus: { code: 'cursando', name: 'cursando' },
    };
  }

  const phaseStatus = phase.lastPhase.phaseStatus.toLowerCase();
  return {
    semester: phase.lastPhase.semester,
    userId: user.id,
    phaseStatus: {
      code: phaseStatus,
      name: phaseStatus,
    },
    subject: { name: phase.subject.name, id: phase.subject._id },
  };
};

export const PhaseDialog = () => {
  const {
    displayModal,
    phaseOfSubjectSelected,
    user,
    setDisplayModal,
    setPhaseOfSubjectSelected,
  } = useContext(SubjectHistoryContext);

  const { title } = useTitle({
    createTitle: 'Agregar materia',
    updateTitle: 'Editar fase de la materia',
    displayModal,
    hasEntitySelected: !!phaseOfSubjectSelected,
  });

  const initial = useMemo(
    () => generateInitialValue(user, phaseOfSubjectSelected),
    [ user, phaseOfSubjectSelected ],
  );

  return (
    <Dialog
      header={title}
      className="shadow-5 w-11 md:w-6 lg:w-5"
      modal
      blockScroll
      visible={displayModal}
      onHide={() => {
        setPhaseOfSubjectSelected(undefined);
        setDisplayModal(false);
      }}
    >
      <PhaseDataForm
        initialValues={initial}
        buttonLabel={title}
      />
    </Dialog>
  );
};

export default PhaseDialog;
