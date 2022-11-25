import { useContext, useEffect } from 'react';

import { FileSingleInputApp } from '../../forms';
import { StepContext } from '../../stepWizard/stepContext';

export const InterSubjectsForm = () => {
  const { setCanAdvance, interSubjectFile } = useContext(StepContext);

  useEffect(() => {
    setCanAdvance(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = async (
    files: File | null,
  ) => {
    interSubjectFile.current = files;
  };

  return (
    <FileSingleInputApp
      accept=".csv, .txt"
      onChange={onChange}
      uploadOptions={{ style: { display: 'none' }}}
      emptyLabel="Arraste el archivo intersemestrales aqui (No es obligatorio)"
      initialFile={interSubjectFile.current}
    />
  );
};

export default InterSubjectsForm;
