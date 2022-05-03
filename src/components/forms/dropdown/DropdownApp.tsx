import { Dropdown } from 'primereact/dropdown';
import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';

import { Generic } from '../../../interfaces/generic';

interface Props extends Generic{
    label: string,
    name: string,
    options: any[],
    optionLabel: string,
    className?: string,
    dropdownIcon?: string,
    id?: string,
    placeholder?: string,
}

export const DropdownApp = ({ label, ...props }: Props) => {
  const [ field, meta ] = useField(props);

  const showErrorClass = meta.error && meta.touched;
  const classname = classNames(props.className, { 'p-invalid': showErrorClass });

  return (
    <>
      <span className="p-float-label">
        <Dropdown {...props} {...field} className={classname} />
        <label htmlFor={props.id || props.name} className={classNames({ 'p-error': showErrorClass })}>{label}</label>
      </span>
      <ErrorMessage name={props.name}>
        {(msg: string) => <small className="p-error">{msg}</small>}
      </ErrorMessage>
    </>
  );
};

DropdownApp.defaultProps = {
  className: '',
  dropdownIcon: 'pi pi-chevron-down',
  id: '',
  placeholder: '',
};

export default DropdownApp;
