import RadioButtonApp, { PropsRadioButton } from './RadioButtonApp';

interface Props {
    radios: Array<PropsRadioButton>
}

const RadioGroup = ({ radios }: Props) => (
  <div className="flex field pt-2 justify-content-start">
    {radios.map((r) => <RadioButtonApp {...r} />)}
  </div>
);

export default RadioGroup;
