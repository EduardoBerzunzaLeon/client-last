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
  <div className="ml-2 flex flex-column card">
    <h4 className="text-purple-700 mb-2">Estudiante</h4>
    <div className="flex align-items-center">
      <ProfileImage imageURL={avatar} className="border-circle w-7rem h-7rem mr-3" />
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
          {gender === 'M' ? 'Masculino' : 'Femenino'}
        </span>

      </div>
    </div>
  </div>
);

export default StudentCard;
