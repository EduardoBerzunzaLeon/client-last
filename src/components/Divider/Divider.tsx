import { Divider as PrimeDivider } from 'primereact/divider';

interface Props {
    text: string,
    icon: string
}

const Divider = ({ text, icon }: Props) => (
  <PrimeDivider align="left">
    <div className="inline-flex align-items-center text-purple-700">
      <i className={`pi pi-${icon} mr-2`} />
      <b>{text}</b>
    </div>
  </PrimeDivider>
);

export default Divider;
