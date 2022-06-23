import { ProfessorInHistory } from '../../../../../../interfaces/api';

export interface InitialProfessor {
    fullname: string,
    value: string,
    avatar: string,
  }

export interface ProfessorInHistoryValues {
    currentProfessor: string,
    professor: InitialProfessor,
    createdAt: Date,
    comments: string
  }

export const initialProfessor: InitialProfessor = {
  fullname: '',
  value: '',
  avatar: '',
};

export const setProfessorToAutocomplete = ({
  professor,
}: ProfessorInHistory): InitialProfessor => ({
  fullname: `${professor.name.first} ${professor.name.last}`,
  value: professor.id,
  avatar: professor.avatar,
});

export const getFormValues = (professor?: ProfessorInHistory): ProfessorInHistoryValues => ({
  currentProfessor: professor ? setProfessorToAutocomplete(professor).fullname : '',
  professor: initialProfessor,
  createdAt: new Date(),
  comments: '',
});

export default {
  setProfessorToAutocomplete,
  getFormValues,
};
