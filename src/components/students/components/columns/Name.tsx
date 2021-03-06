import { StudentResume } from '../../../../interfaces';
import { TextImageBody } from '../../../datatable';

export const NameBodyTemplate = ({ name, avatar }: StudentResume) => (
  <TextImageBody text={name.first} imageURL={avatar} />
);

export default NameBodyTemplate;
