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
    type?: string;
    [x: string]: any
}

export const InputTextApp = ({ label, ...props }: Props) => {
  const [ field, meta ] = useField(props);
  const showErrorClass = meta.error && meta.touched;
  const classname = classNames(props.className, { 'p-invalid': showErrorClass });

  return (
    <>
      <span className="p-float-label p-input-icon-right w-full">
        <i className={props.icon} />
        { props.type !== 'password'
          ? <InputText {...field} {...props} className={classname} />
          : <Password {...field} {...props} className={classname} />}

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
