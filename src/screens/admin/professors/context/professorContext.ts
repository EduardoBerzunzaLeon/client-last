import React, { createContext } from 'react';

import { Professor } from '../../../../interfaces/api';

interface ProfessorContextProps {
    displayCoursesModal: boolean,
    displayModal: boolean,
    lazyParams: any,
    professorSelected: Professor | undefined,
    setDisplayCoursesModal: (value: React.SetStateAction<boolean>) => void,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setLazyParams: (value: React.SetStateAction<any>) => void
    setProfessorSelected: (value: React.SetStateAction<Professor | undefined>) => void,
  }

export const ProfessorContext = createContext({} as ProfessorContextProps);

export default ProfessorContext;
