import { FileUploadItemTemplateType } from 'primereact/fileupload';
import { PrimeFile } from '../../../interfaces';

export const ItemFileInput: FileUploadItemTemplateType = ({ name, objectURL }: PrimeFile) => (
  <img alt={name} role="presentation" className="w-full" src={objectURL} />
);

export const ItemImageDefault = ({ name, objectURL }: PrimeFile) => (<img alt={name} role="presentation" className="w-full" src={objectURL} />);
export const ItemFileDefault = ({ name }: File) => (
  <span className="p-d-flex p-dir-col p-text-left p-ml-3">
    {name}
    <small>{new Date().toLocaleDateString()}</small>
  </span>
);

export default {
  ItemFileInput,
  ItemImageDefault,
};
