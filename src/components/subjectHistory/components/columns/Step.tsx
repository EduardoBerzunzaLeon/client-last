import { Badge } from '../../../ui';
import { convertStepToString } from '../../../../utils';
import { SubjectsStudied } from '../../../../interfaces';

interface Props {
  step: number;
}

export const StepBody = ({ step }: Props) => {
  const stepString = convertStepToString(step);

  return (
    <Badge
      text={stepString}
      matchObject={{
        primero: 'info',
        segundo: 'warning',
        tercer: 'danger',
      }}
      match={stepString}
    />
  );
};

export const StepBodyTemplate = ({ data }: SubjectsStudied) => {
  if (data?.step) {
    return (<StepBody step={Number(data.step)} />);
  }
  return undefined;
};

export default {
  StepBody,
  StepBodyTemplate,
};
