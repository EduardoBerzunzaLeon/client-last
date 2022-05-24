import { TextImageBody } from '../../../../../components/datatable';
import { User } from '../../../../../interfaces/api';

export const EmailBodyTemplate = ({ email, avatar }: User) => (
  <TextImageBody text={email} imageURL={avatar} />
);

export default EmailBodyTemplate;
