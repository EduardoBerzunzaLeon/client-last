import { ProgressBar } from 'primereact/progressbar';

export const ProgressBarFileInput = ({ isLoading = false }: {isLoading: boolean}) => <ProgressBar mode={isLoading ? 'indeterminate' : 'determinate'} style={{ height: '6px' }} />;

export const ProgressBarFileControlledInput = ({ isLoading = false }: {isLoading: boolean}) => () => <ProgressBar mode={isLoading ? 'indeterminate' : 'determinate'} style={{ height: '6px' }} />;

export default ProgressBarFileInput;
