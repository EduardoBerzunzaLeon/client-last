import { ErrorMessage, useField } from 'formik';
import classNames from 'classnames';

import React from 'react';
import { Generic } from '../../../interfaces/generic';

interface Props extends Generic{
    label: string,
    name: string,
    options?: any[],
    optionLabel?: string,
    className?: string,
    element: React.ComponentType<any>
    dropdownIcon?: string,
    id?: string,
    placeholder?: string,
}

export const FormElement = ({ label, element, ...props }: Props) => {
  const [ field, meta ] = useField(props);
  const Element = element;
  const showErrorClass = meta.error && meta.touched;
  const classname = classNames(props.className, { 'p-invalid': showErrorClass });

  return (
    <>
      <span className="p-float-label">
        <Element {...props} {...field} className={classname} />
        <label htmlFor={props.id || props.name} className={classNames({ 'p-error': showErrorClass })}>{label}</label>
      </span>
      <ErrorMessage name={props.name}>
        {(msg: string) => <small className="p-error">{msg}</small>}
      </ErrorMessage>
    </>
  );
};

FormElement.defaultProps = {
  className: '',
  dropdownIcon: 'pi pi-chevron-down',
  id: '',
  placeholder: '',
  options: [],
  optionLabel: '',
};

export default FormElement;
