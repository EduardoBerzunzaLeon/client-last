import { TextImageBody } from '../../../../../components/datatable';
import { Professor } from '../../../../../interfaces';

export const EmailBodyTemplate = ({ email, avatar }: Professor) => (
  <TextImageBody text={email} imageURL={avatar} />
);

export default EmailBodyTemplate;
