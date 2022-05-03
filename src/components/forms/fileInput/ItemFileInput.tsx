import { FileUploadItemTemplateType } from 'primereact/fileupload';
import { PrimeFile } from '../../../interfaces/ui/primereact/primeFileInterface';

export const ItemFileInput: FileUploadItemTemplateType = ({ name, objectURL }: PrimeFile) => (
  <img alt={name} role="presentation" className="w-full" src={objectURL} />
);

export const ItemFileDefault = ({ name, objectURL }: PrimeFile) => () => (<img alt={name} role="presentation" className="w-full" src={objectURL} />);

export default ItemFileInput;
