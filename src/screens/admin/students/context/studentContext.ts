import { DataTablePFSEvent } from 'primereact/datatable';
import React, { createContext } from 'react';

import { StudentResume } from '../../../../interfaces/api';

interface StudentContextProps {
    displayModal: boolean,
    displayProfessorsHistoryModal: boolean,
    lazyParams: DataTablePFSEvent,
    studentSelected: StudentResume | undefined,
    setDisplayModal: (value: React.SetStateAction<boolean>) => void,
    setDisplayProfessorsHistoryModal: (value: React.SetStateAction<boolean>) => void,
    setLazyParams: (value: React.SetStateAction<any>) => void,
    setFilterValue: (fieldName: string, value: any) => void,
    setStudentSelected: (value: React.SetStateAction<StudentResume | undefined>) => void,
  }

export const StudentContext = createContext({} as StudentContextProps);

export default StudentContext;
