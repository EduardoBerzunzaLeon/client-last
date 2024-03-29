// import { Toast } from 'primereact/toast';
import React, { createContext } from 'react';
import { SubjectHistory, UserContext } from '../../../interfaces';

interface SubjectHistoryContextProps {
    displayModal: boolean,
    phaseOfSubjectSelected?: SubjectHistory,
    user: UserContext,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setPhaseOfSubjectSelected: (value: React.SetStateAction<SubjectHistory | undefined>) => void,
  }

export const SubjectHistoryContext = createContext({} as SubjectHistoryContextProps);

export default SubjectHistoryContext;
