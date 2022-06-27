import { atRiskOptions } from '../../assets/options';
import { Badge } from '../../../../../components/ui';
import { createSelectFilter } from '../../../../../components/datatable';

export const AtRiskFilter = createSelectFilter({ options: atRiskOptions, placeholder: 'Elige el riesgo' });

export const AtRiskBody = ({ atRisk }: { atRisk: string }) => {
  const atRiskCleaned = atRisk.replaceAll(' ', '');

  return (
    <Badge
      text={atRisk}
      matchObject={{
        no: 'success',
        ultimointento: 'danger',
        unicamateria: 'danger',
        notermina: 'danger',
      }}
      match={atRiskCleaned}
    />
  );
};

export default {
  AtRiskFilter,
  AtRiskBody,
};
