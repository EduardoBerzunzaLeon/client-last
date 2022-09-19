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

export const StepBodyTemplate = ({ step }: Props) => {
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

export default {
  StepBodyTemplate,
};
