import { Badge, ProfileImage } from '../../ui';
import { convertDateToString } from '../../../utils';
import { PhaseSchoolYear } from '../../../interfaces';

interface Props extends PhaseSchoolYear {
    title: string,
}

export const PhaseCard = ({
  createdAt, user, status, title,
}: Props) => (
  <div className={`ml-2 flex flex-column card ${!user && 'bg-yellow-200'}`}>
    <h4 className="text-purple-700 mb-2">{ title }</h4>
    <div className="flex align-items-center">

      { user
        ? (<ProfileImage imageURL={user.avatar} className="border-circle w-7rem h-7rem mr-3" />)
        : (<i className="pi pi-exclamation-triangle" style={{ fontSize: '7em', color: '#d5a326' }} />)}

      <div className="ml-2 flex flex-column card-container surface-overlay overflow-hidden text-overflow-clip">
        <span style={{ backgroundColor: !user ? '#FFE994' : 'white' }}>
          <b className="text-purple-700">Estatus: </b>
          <Badge
            matchObject={{
              generado: 'success',
              nogenerado: 'danger',
            }}
            match={status.replaceAll(' ', '')}
            text={status}
          />
        </span>
        {
            user && (
            <>
              <span>
                <b className="text-purple-700">Nombre: </b>
                { `${user.name.first} ${user.name.last}` }
              </span>
              <span>
                <b className="text-purple-700">Email: </b>
                { user.email }
              </span>
              <span>
                <b className="text-purple-700">Generado el: </b>
                { convertDateToString(createdAt) }
              </span>
            </>
            )
        }
      </div>
    </div>
  </div>
);

export default PhaseCard;
