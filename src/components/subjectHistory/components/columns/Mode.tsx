import { Badge } from '../../../ui';
import { SubjectHistory, SubjectsStudied } from '../../../../interfaces';

interface Props {
  mode: string;
}

export const ModeBody = ({ mode }: Props) => (
  <Badge
    text={mode}
    matchObject={{
      normal: 'info',
      adelantar: 'purple',
      intersemestral: 'danger',
    }}
    match={mode}
  />
);

export const ModeBodyTemplate = ({
  lastPhase,
}: SubjectHistory) => (<ModeBody mode={lastPhase.mode} />);

export const ModeBodyTemplateTree = ({
  data,
}: SubjectsStudied) => {
  if (data?.mode) {
    return (<ModeBody mode={data.mode} />);
  }
  return undefined;
};

export default {
  ModeBody,
  ModeBodyTemplate,
  ModeBodyTemplateTree,
};
