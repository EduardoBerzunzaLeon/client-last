import { ErrorMessage, useField } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import classNames from 'classnames';

interface Props {
    label: string;
    name: string;
    className?: string;
    icon?: string,
    id?: string,
    placeholder?: string;
    type?: 'text' | 'email'| 'password';
    [x: string]: any
}

const InputTextApp = ({ label, ...props }: Props) => {
  const [ field, meta ] = useField(props);
  const showErrorClass = meta.error && meta.touched;

  return (
    <>
      <span className="p-float-label p-input-icon-right w-full">
        <i className={props.icon} />
        { props.type !== 'password'
          ? <InputText {...field} {...props} className={classNames(props.className, { 'p-invalid': showErrorClass })} />
          : <Password {...field} {...props} className={classNames(props.className, { 'p-invalid': showErrorClass })} />}

        <label htmlFor={props.id || props.name} className={classNames({ 'p-error': showErrorClass })}>{label}</label>
      </span>
      <ErrorMessage name={props.name}>
        {(msg: string) => <small className="p-error">{msg}</small>}
      </ErrorMessage>

    </>
  );
};

InputTextApp.defaultProps = {
  className: '',
  icon: '',
  id: '',
  placeholder: '',
  type: 'text',
};

export default InputTextApp;
