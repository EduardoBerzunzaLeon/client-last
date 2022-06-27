import { ProgressSpinner } from 'primereact/progressspinner';

interface Props {
  message: string,
  className?: string,
}

export const Spinner = ({ message, className }: Props) => (
  <div className={className}>
    <ProgressSpinner strokeWidth="4" />
    <span className=" font-bold text-2xl text-pink-700">{message}</span>
  </div>

);

Spinner.defaultProps = {
  className: 'flex flex-column align-items-center justify-content-center h-screen',
};

export default Spinner;
