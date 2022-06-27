import { StudentResume } from '../../../../interfaces';
import { TextImageBody } from '../../../datatable';

export const ProfessorBodyTemplate = ({ professor }: StudentResume) => (
  <TextImageBody text={professor.name.first} imageURL={professor.avatar} />
);

export default ProfessorBodyTemplate;
