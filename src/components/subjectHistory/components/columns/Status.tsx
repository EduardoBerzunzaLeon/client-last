import { memo } from 'react';

import { Badge } from '../../../ui';
import { SubjectHistory, SubjectsStudied } from '../../../../interfaces';

export const StatusBody = memo(({ status }: { status: string }) => (
  <Badge
    text={status}
    matchObject={{
      cursando: 'info',
      reprobado: 'danger',
      aprobado: 'success',
    }}
    match={status}
  />
));

export const StatusBodyTemplate = ({ data }: SubjectsStudied) => {
  if (data?.status) {
    const { status } = data;
    return (
      <StatusBody status={status} />
    );
  }
  return undefined;
};

export const StatusCurrentTemplate = ({
  lastPhase,
}: SubjectHistory) => <StatusBody status={lastPhase.phaseStatus} />;

export default {
  StatusBody,
  StatusBodyTemplate,
  StatusCurrentTemplate,
};
