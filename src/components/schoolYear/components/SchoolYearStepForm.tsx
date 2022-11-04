import { useRef } from 'react';
import { useGenerateSchoolYearMutation } from '../../../redux/schoolYear/schoolYear.api';
import { CurrentSubjectsForm } from './CurrentSubjectsForm';
import { FailedSubjectsForm } from './FailedSubjectsForm';
import { StepsDemo } from './Steps';
import { ValidationPasswordForm } from './ValidationPasswordForm';
import { GenerateSchoolYear } from '../../../interfaces/api/requests/schoolYear';
import { convertModelToFormData } from '../../../utils';

export const SchoolYearStepForm = () => {
  const failedSubjectFile = useRef<any>(null);
  const currentSubjectFile = useRef<any>(null);
  const passwordInput = useRef<any>(null);

  const [ generate, { isLoading }] = useGenerateSchoolYearMutation();

  console.log(isLoading);

  const contextValues = {
    failedSubjectFile,
    currentSubjectFile,
    passwordInput,
  };

  const handleNextButton = async () => {
    const prepareData: GenerateSchoolYear = {
      files: [ failedSubjectFile.current, currentSubjectFile.current ],
      password: passwordInput.current,
    };

    try {
      const dataSend = convertModelToFormData(prepareData);
      console.log(dataSend);
      await generate(dataSend).unwrap();
    //   currentSubjectFile.current = null;
    //   failedSubjectFile.current = null;
    //   passwordInput.current = '';
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      label: 'Materias Reprobadas',
      children: <FailedSubjectsForm />,
    },
    {
      label: 'Materias Nuevas',
      children: <CurrentSubjectsForm />,
    },
    {
      label: 'Validación',
      children: <ValidationPasswordForm />,
      nextButton: handleNextButton,
      nextButtonLabel: 'Actualizar',
    },
  ];
  return (
    <div className="col-12">
      <StepsDemo
        contextValues={contextValues}
        initAdvanceValue={false}
        items={items}
      />
    </div>
  );
};

export default SchoolYearStepForm;
