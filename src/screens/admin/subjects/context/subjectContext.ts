import React, { createContext } from 'react';

import { Subject } from '../../../../interfaces';

interface SubjectContextProps {
    displayModal: boolean,
    isOpenDetailModal: boolean,
    lazyParams: any,
    subjectSelected: Subject | undefined,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setIsOpenDetailModal: (value: React.SetStateAction<boolean>) => void,
    setLazyParams: (value: React.SetStateAction<any>) => void,
    setFilterValue: (fieldName: string, value: any) => void,
    setSubjectSelected: (value: React.SetStateAction<Subject | undefined>) => void,
  }

export const SubjectContext = createContext({} as SubjectContextProps);

export default SubjectContext;
