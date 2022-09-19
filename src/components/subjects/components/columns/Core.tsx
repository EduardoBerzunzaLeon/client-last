import { Badge } from '../../../ui';
// import { Subject } from '../../../../interfaces';

interface Props {
  core: string
}

export const CoreBodyTemplate = ({ core }: Props) => (
  <Badge
    text={core}
    matchObject={{
      básico: 'warning',
      sustantivo: 'success',
      integral: 'info',
    }}
    match={core.toString().toLowerCase()}
  />
);

export default {
  CoreBodyTemplate,
};
