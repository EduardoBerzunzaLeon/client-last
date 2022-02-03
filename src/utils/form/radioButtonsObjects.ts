import { PropsRadioButton } from '../../components/forms/radioButton/RadioButtonApp';

export const genderRadio: Array<PropsRadioButton> = [
  {
    label: 'Masculino',
    name: 'gender',
    inputId: 'male',
    value: 'M',
  },
  {
    label: 'Femenino',
    name: 'gender',
    inputId: 'famale',
    value: 'F',
    className: 'ml-2',
  },
];

export default {
  genderRadio,
};
