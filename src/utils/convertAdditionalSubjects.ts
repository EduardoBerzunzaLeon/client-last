import { RequiredSubjects, SubjectUnion } from '../interfaces/api';
import { ucWords } from './stringUtils';

export const convertAdditionalSubjects = (requiredSubjects: SubjectUnion[]): RequiredSubjects[] => {
  const subjects = requiredSubjects.map((subject) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: subject._id,
    name: ucWords(subject.name),
  }));

  return subjects;
};

export default convertAdditionalSubjects;
