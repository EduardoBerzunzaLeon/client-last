import React, { createContext } from 'react';
import { SubjectHistory } from '../../../interfaces';

interface SubjectHistoryContextProps {
    displayModal: boolean,
    phaseOfSubjectSelected: SubjectHistory | undefined,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setPhaseOfSubjectSelected: (value: React.SetStateAction<SubjectHistory | undefined>) => void,
  }

export const SubjectHistoryContext = createContext({} as SubjectHistoryContextProps);

export default SubjectHistoryContext;
