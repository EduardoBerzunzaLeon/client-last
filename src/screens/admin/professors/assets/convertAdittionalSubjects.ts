import { RequiredSubjects } from '../../../../interfaces/api';
import { SubjectProfessor } from '../../../../interfaces/api/responses/professorInterface';
import { ucWords } from '../../../../utils/stringUtils';

export const convertAdditionalSubjects = (
  requiredSubjects: SubjectProfessor[],
): RequiredSubjects[] => {
  const subjects = requiredSubjects.map((subject) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: subject._id,
    name: ucWords(subject.name),
  }));

  return subjects;
};

export default convertAdditionalSubjects;
