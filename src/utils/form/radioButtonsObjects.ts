import { PropsRadioButton } from '../../components/forms/radioButton/RadioButtonApp';

export const genderRadio: Array<PropsRadioButton> = [
  {
    label: 'Hombre',
    name: 'gender',
    inputId: 'male',
    value: 'M',
  },
  {
    label: 'Mujer',
    name: 'gender',
    inputId: 'famale',
    value: 'F',
    className: 'ml-2',
  },
];

export default {
  genderRadio,
};
