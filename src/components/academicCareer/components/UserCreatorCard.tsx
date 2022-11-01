import { Name } from '../../../interfaces';
import { convertDateToString } from '../../../utils';
import { ProfileImage } from '../../ui';

interface Props {
  name: Name;
  avatar: string;
  createdAt: Date;
}

export const UserCreatorCard = ({ createdAt, name, avatar }: Props) => (
  <div className="ml-2 flex flex-column card">
    <h4 className="text-purple-700 mb-2">Usuario Generador</h4>
    <div className="flex align-items-center">
      <ProfileImage imageURL={avatar} className="border-circle w-7rem h-7rem mr-3" />
      <div className="ml-2 flex flex-column card-container">
        <span>
          <b className="text-purple-700">Nombre: </b>
          {`${name.first} ${name.last}`}
        </span>
        <span>
          <b className="text-purple-700">Generado el: </b>
          { convertDateToString(createdAt) }
        </span>
      </div>
    </div>
  </div>
);

export default UserCreatorCard;
