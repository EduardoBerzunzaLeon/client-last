import { useContext, useEffect } from 'react';

import { FileSingleInputApp } from '../../forms';
import { StepContext } from '../../stepWizard/stepContext';

export const CurrentSubjectsForm = () => {
  const { setCanAdvance, currentSubjectFile } = useContext(StepContext);

  useEffect(() => {
    setCanAdvance(Boolean(currentSubjectFile.current));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = async (
    files: File | null,
  ) => {
    currentSubjectFile.current = files;
    setCanAdvance(Boolean(files));
  };

  return (
    <FileSingleInputApp
      accept=".csv, .txt"
      onChange={onChange}
      uploadOptions={{ style: { display: 'none' }}}
      emptyLabel="Arraste el archivo de materias nuevas aqui"
      initialFile={currentSubjectFile.current}
    />
  );
};

export default CurrentSubjectsForm;
