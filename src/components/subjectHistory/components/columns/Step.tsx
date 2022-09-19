import { SubjectsStudied } from '../../../../interfaces';
import { Badge } from '../../../ui';

const convertStepToString = (step:number) => {
  const stepInString = new Map([
    [ 1, 'primero' ],
    [ 2, 'segundo' ],
    [ 3, 'tercero' ],
  ]);

  return stepInString.get(step) ?? '';
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
