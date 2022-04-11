import classNames from 'classnames';
import { ErrorMessage, useField } from 'formik';
import { ToggleButton } from 'primereact/togglebutton';
import { Generic } from '../../../interfaces/generic';

interface Props extends Generic{
    name: string,
    className?: string,
    id?: string,
    offClassName?: string,
    offIcon?: string,
    offLabel?: string,
    onClassName?: string,
    onIcon?: string,
    onLabel?: string,
}

export const ToggleButtonApp = ({ ...props }: Props) => {
  const [ field, meta ] = useField(props);

  const showErrorClass = meta.error && meta.touched;
  const classname = classNames(props.className, { 'p-invalid': showErrorClass });
  const { value, ...restField } = field;

  return (
    <>
      <ToggleButton
        {...props}
        {...restField}
        checked={value}
        className={`${classname} 
          ${field.value ? props.onClassName : props.offClassName}`}
      />
      <ErrorMessage name={props.name}>
        {(msg: string) => <small className="p-error">{msg}</small>}
      </ErrorMessage>
    </>
  );
};

ToggleButtonApp.defaultProps = {
  offClassName: '',
  offIcon: '',
  offLabel: '',
  onClassName: '',
  onIcon: '',
  onLabel: '',
  className: '',
  id: 'role',
};

export default ToggleButtonApp;
