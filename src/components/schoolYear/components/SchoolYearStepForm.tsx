import { useRef, useState } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';

// eslint-disable-next-line import/no-unresolved
import { MenuItem } from 'primereact/menuitem';

import { convertModelToFormData, numberUtils, processError } from '../../../utils';
import { CurrentSubjectsForm } from './CurrentSubjectsForm';
import { ErrorResponse } from '../../../interfaces';
import { FailedSubjectsForm } from './FailedSubjectsForm';
import { GenerateSchoolYear } from '../../../interfaces/api/requests/schoolYear';
import { InterSubjectsForm } from './InterSubjectsForm';
import { StepsWizard } from '../../stepWizard';
import { ValidationPasswordForm } from './ValidationPasswordForm';

import { useGenerateSchoolYearMutation } from '../../../redux/schoolYear/schoolYear.api';

import { useToast } from '../../../hooks';

interface Item extends MenuItem {
  children: JSX.Element;
  nextButton?: {
      handler: () => Promise<void>;
      label: string;
      isLoading: boolean;
  };
}

export const SchoolYearStepForm = () => {
  const failedSubjectFile = useRef<any>(null);
  const currentSubjectFile = useRef<any>(null);
  const interSubjectFile = useRef<any>(null);
  const passwordInput = useRef<any>(null);

  const [ generate, { isLoading }] = useGenerateSchoolYearMutation();
  const { toast, showError, showSuccess } = useToast();
  const [ activeIndex, setActiveIndex ] = useState(0);

  const contextValues = {
    failedSubjectFile,
    currentSubjectFile,
    interSubjectFile,
    passwordInput,
  };

  const resetForm = () => {
    currentSubjectFile.current = null;
    failedSubjectFile.current = null;
    interSubjectFile.current = null;
    passwordInput.current = '';
    setActiveIndex(0);
  };

  const handleNextButton = async () => {
    const files = [ failedSubjectFile.current, currentSubjectFile.current ];

    interSubjectFile.current && files.push(interSubjectFile.current);

    const prepareData: GenerateSchoolYear = {
      files,
      password: passwordInput.current,
    };

    try {
      const dataSend = convertModelToFormData(prepareData);
      await generate(dataSend).unwrap();
      resetForm();
      showSuccess({ detail: 'El ciclo escolar a inicializado con éxito' });
    } catch (error) {
      if ((error as ErrorResponse)?.status === 400) {
        resetForm();
      }
      processError({ error, showError });
    }
  };

  const items: Item[] = [
    {
      label: 'Reprobadas',
      children: <FailedSubjectsForm />,
    },
    {
      label: 'Nuevas',
      children: <CurrentSubjectsForm />,
    },
    {
      label: 'Inter',
      children: <InterSubjectsForm />,
    },
    {
      label: 'Validación',
      children: <ValidationPasswordForm />,
      nextButton: {
        handler: handleNextButton,
        label: 'Actualizar',
        isLoading,
      },
    },
  ];

  const onChange = (increaseBy: number) => {
    const maxValue = items.length;
    setActiveIndex((prev) => numberUtils.increaseBy({ value: prev + increaseBy, maxValue }));
  };

  return (
    <Card title="Actualización del Ciclo Escolar">
      <Toast ref={toast} />
      <StepsWizard
        contextValues={contextValues}
        initAdvanceValue={false}
        items={items}
        activeStep={activeIndex}
        onChange={onChange}
      />
    </Card>
  );
};

export default SchoolYearStepForm;
