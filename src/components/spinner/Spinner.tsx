import { ProgressSpinner } from 'primereact/progressspinner';

const Spinner = ({ message }: { message: string }) => (
  <div className="flex flex-column align-items-center justify-content-center h-screen">
    <ProgressSpinner strokeWidth="4" />
    <span className=" font-bold text-2xl text-pink-700">{message}</span>
  </div>

);

export default Spinner;
