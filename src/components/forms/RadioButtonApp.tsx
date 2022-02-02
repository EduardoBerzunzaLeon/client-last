import classNames from 'classnames';
import { useField } from 'formik';
import { RadioButton } from 'primereact/radiobutton';

export interface PropsRadioButton {
  label: string;
  name: string;
  inputId: string;
  value: string;
  className?: string;
  id?: string,
  [x: string]: any
}

const RadioButtonApp = ({ label, ...props }: PropsRadioButton) => {
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
