import { Badge, SpanDetail, Divider } from '../../ui';
import { SubjectUnion } from '../../../interfaces';
import { ucWords } from '../../../utils';

interface Props {
    subjects: SubjectUnion[],
    title: string
}

export const SubjectsList = ({ subjects, title }: Props) => (
  <div className="mt-5">
    <Divider text={title} className="text-lg" icon="clone" />
    <ul>
      {
        subjects.map((subject) => (
          // eslint-disable-next-line no-underscore-dangle
          <li key={subject._id} className="flex flex-row mb-3">
            <SpanDetail
              title="Nombre:"
              icon="check-circle"
              value={ucWords(subject.name)}
            />

            <Badge
              className="ml-2"
              text={subject.deprecated ? 'Deprecado' : 'Activo'}
              matchObject={{
                true: 'danger',
                false: 'success',
              }}
              match={subject.deprecated.toString()}
            />
          </li>
        ))
    }
    </ul>
  </div>
);

export default SubjectsList;
