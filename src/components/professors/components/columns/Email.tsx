import { Professor } from '../../../../interfaces';
import { TextImageBody } from '../../../datatable';

export const EmailBodyTemplate = ({ email, avatar }: Professor) => (
  <TextImageBody text={email} imageURL={avatar || ''} />
);

export default EmailBodyTemplate;
