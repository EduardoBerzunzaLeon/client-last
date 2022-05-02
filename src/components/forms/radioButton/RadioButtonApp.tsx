import { RadioButton } from 'primereact/radiobutton';
import { useField } from 'formik';
import classNames from 'classnames';

import { Generic } from '../../../interfaces/generic';

export interface RadioButtonProps extends Generic {
  label: string,
  name: string,
  inputId: string,
  value: string,
  className?: string,
  id?: string,
}

export const RadioButtonApp = ({ label, ...props }: RadioButtonProps) => {
  const [ field ] = useField(props);

  return (
    <div className={classNames('field-radiobutton', props.className)}>
      <RadioButton checked={field.value === props.value} {...field} {...props} />
      <label htmlFor={props.id || props.name}>{label}</label>
    </div>
  );
};

RadioButtonApp.defaultProps = {
  className: '',
  id: '',
};

export default RadioButtonApp;
