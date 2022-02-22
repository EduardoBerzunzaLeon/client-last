import { ProgressSpinner } from 'primereact/progressspinner';
import './spinner.scss';

const Spinner = ({ message }: { message: string }) => (
  <>
    <ProgressSpinner className="flex align-items-center justify-content-center" strokeWidth="4" />
    <span className="flex align-items-center justify-content-center p-spinner-text">{message}</span>
  </>
);

export default Spinner;
