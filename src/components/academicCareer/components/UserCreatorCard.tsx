import { Card } from 'primereact/card';
import { Name } from '../../../interfaces';
import { ProfileImage } from '../../ui';

interface Props {
  _id: string;
  name: Name;
  avatar: string;
}

export const UserCreatorCard = ({ _id, name, avatar }: Props) => (
  <Card title="Usuario generador">
    <div className="flex align-items-center">
      <ProfileImage imageURL={avatar} className="border-circle w-7rem h-7rem" />
      <div className="ml-2 flex flex-column card-container">
        <span>
          <b className="text-purple-700">Nombre: </b>
          {`${name.first} ${name.last} ${_id}`}
        </span>
      </div>
    </div>
  </Card>
);

export default UserCreatorCard;
