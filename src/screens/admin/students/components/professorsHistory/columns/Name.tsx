import { ProfessorInHistory } from '../../../../../../interfaces/api';
import { TextImageBody } from '../../../../../../components/datatable';

export const NameHistoryBodyTemplate = ({ professor: { name, avatar }}: ProfessorInHistory) => (
  <TextImageBody text={`${name.first} ${name.last}`} imageURL={avatar} />
);

export default NameHistoryBodyTemplate;
