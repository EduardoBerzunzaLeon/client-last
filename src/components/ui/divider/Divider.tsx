import { Divider as PrimeDivider } from 'primereact/divider';

interface Props {
    text: string,
    icon: string,
    className?: string,
}

export const Divider = ({ text, icon, className }: Props) => (
  <PrimeDivider align="left">
    <div className={`inline-flex align-items-center text-purple-700 ${className}`}>
      <i className={`pi pi-${icon} mr-2`} />
      <b>{text}</b>
    </div>
  </PrimeDivider>
);

Divider.defaultProps = {
  className: '',
};

export default Divider;
