import { inChanellingOptions } from '../../assets/options';
import { Badge } from '../../../../../components/badge/Badge';
import { createSelectFilter } from '../../../../../components/datatable';

export const InChannellingFilter = createSelectFilter({
  options: inChanellingOptions,
  placeholder: 'Elige la canalización',
});

export const InChannellingBody = ({ inChannelling }: { inChannelling: string }) => {
  const inChannellingCleaned = inChannelling.replaceAll(' ', '');

  return (
    <Badge
      text={inChannelling}
      matchObject={{ no: 'success' }}
      noMatch="purple"
      match={inChannellingCleaned}
    />
  );
};

export default {
  InChannellingFilter,
  InChannellingBody,
};
