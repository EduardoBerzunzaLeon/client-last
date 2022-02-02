import RadioButtonApp, { PropsRadioButton } from './RadioButtonApp';

interface Props {
    radios: Array<PropsRadioButton>,
}

const RadioGroup = ({ radios }: Props) => (
  <div className="flex justify-content-start">
    {radios.map((r) => <RadioButtonApp key={r.inputId} {...r} />)}
  </div>
);

export default RadioGroup;
