import { SubjectsStudied } from '../../../../interfaces';
import { Badge } from '../../../ui';

const convertStepToString = (step:number) => {
  const steps = [ 'primero', 'segundo', 'tercero' ];

  if (step < 0 || step > 3) {
    return '';
  }

  return steps[step - 1];
};

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
