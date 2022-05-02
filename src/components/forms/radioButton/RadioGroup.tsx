import { RadioButtonApp, RadioButtonProps } from './RadioButtonApp';

interface Props {
    radios: Array<RadioButtonProps>,
}

export const RadioGroup = ({ radios }: Props) => (
  <div className="flex justify-content-start">
    {radios.map((radio) => <RadioButtonApp key={radio.inputId} {...radio} />)}
  </div>
);

export default RadioGroup;
