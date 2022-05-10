import React, { createContext } from 'react';

import { Subject } from '../../../../interfaces/api';

interface SubjectContextProps {
    displayModal: boolean,
    lazyParams: any,
    subjectSelected: Subject | undefined,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setLazyParams: (value: React.SetStateAction<any>) => void
    setSubjectSelected: (value: React.SetStateAction<Subject | undefined>) => void,
  }

export const SubjectContext = createContext({} as SubjectContextProps);

export default SubjectContext;
