import { Badge } from '../../../ui';
import { createSelectFilter } from '../../../datatable';
import { inChanellingOptions } from '../../assets/options';

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
