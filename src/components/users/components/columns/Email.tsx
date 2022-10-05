import { TextImageBody } from '../../../datatable';
import { User } from '../../../../interfaces';

export const EmailBodyTemplate = ({ email, avatar }: User) => (
  <TextImageBody text={email} imageURL={avatar || ''} />
);

export default EmailBodyTemplate;
