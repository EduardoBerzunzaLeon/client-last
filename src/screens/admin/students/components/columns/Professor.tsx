import { TextImageBody } from '../../../../../components/datatable';
import { StudentResume } from '../../../../../interfaces';

export const ProfessorBodyTemplate = ({ professor }: StudentResume) => (
  <TextImageBody text={professor.name.first} imageURL={professor.avatar} />
);

export default ProfessorBodyTemplate;
