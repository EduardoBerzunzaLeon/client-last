import { useContext, useEffect } from 'react';

import { FileSingleInputApp } from '../../forms';
import { StepContext } from '../../stepWizard/stepContext';

export const FailedSubjectsForm = () => {
  const { setCanAdvance, failedSubjectFile } = useContext(StepContext);

  useEffect(() => {
    setCanAdvance(Boolean(failedSubjectFile.current));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = async (
    files: File | null,
  ) => {
    failedSubjectFile.current = files;
    setCanAdvance(Boolean(files));
  };

  return (
    <FileSingleInputApp
      accept=".csv, .txt"
      onChange={onChange}
      uploadOptions={{ style: { display: 'none' }}}
      emptyLabel="Arraste el archivo de materias reprobadas aqui"
      initialFile={failedSubjectFile.current}
    />
  );
};

export default FailedSubjectsForm;
