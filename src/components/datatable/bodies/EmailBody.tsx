import { TextImageBody } from './TextImageBody';

interface Props {
    email: string,
    avatar: string | undefined,
}

export const EmailBody = ({ email, avatar }: Props) => (
  <TextImageBody text={email} imageURL={avatar || ''} />
);

export default EmailBody;
