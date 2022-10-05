import { Card } from 'primereact/card';
import { Name } from '../../../interfaces';

import { ProfileImage } from '../../ui';

interface Props {
    name: Name;
    email: string;
    gender: string;
    avatar: string;
    currentSemester: number;
    enrollment: string;
}

export const StudentCard = ({
  name, email, gender, avatar, currentSemester, enrollment,
}: Props) => (
  <Card title="Alumno">
    <div className="flex align-items-center">
      <ProfileImage imageURL={avatar} className="border-circle w-7rem h-7rem" />
      <div className="ml-2 flex flex-column card-container">
        <span>
          <b className="text-purple-700">Nombre: </b>
          {`${name.first} ${name.last}`}
        </span>
        <span>
          <b className="text-purple-700">Email: </b>
          {email}
        </span>
        <span>
          <b className="text-purple-700">Semestre Actual: </b>
          {currentSemester}
        </span>
        <span>
          <b className="text-purple-700">Matricula: </b>
          {enrollment}
        </span>
        <span>
          <b className="text-purple-700">Sexo: </b>
          {gender}
        </span>

      </div>
    </div>
  </Card>
);

export default StudentCard;
