import { TextImageBody } from '../../../../../components/datatable';
import { StudentResume } from '../../../../../interfaces/api';

export const NameBodyTemplate = ({ name, avatar }: StudentResume) => (
  <TextImageBody text={name.first} imageURL={avatar} />
);

export default NameBodyTemplate;
