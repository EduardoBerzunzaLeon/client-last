import React, { createContext } from 'react';
import { ProfessorInHistory } from '../../../../../../interfaces/api';

interface ProfessorsHistoryContextProps {
    professorSelected: ProfessorInHistory | undefined,
    lastProfessor: ProfessorInHistory | undefined,
    setProfessorSelected: (value: React.SetStateAction<ProfessorInHistory | undefined>) => void,
    setLastProfessor: (value: React.SetStateAction<ProfessorInHistory | undefined>) => void,
  }

export const ProfessorsHistoryContext = createContext({} as ProfessorsHistoryContextProps);

export default ProfessorsHistoryContext;