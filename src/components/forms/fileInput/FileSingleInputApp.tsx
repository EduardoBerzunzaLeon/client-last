import { useRef, useState } from 'react';
import { ProgressBar } from 'primereact/progressbar';

import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadItemTemplateType,
} from 'primereact/fileupload';

import { Tooltip } from 'primereact/tooltip';

export interface PrimeFile {
    objectURL: string,
    name: string,
    lastModified: number,
    webkitRelativePath: string,
    size: number,
    type: string
  }

// interface ItemProps {
//     objectURL: string,
//     name: string,
// }

const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'hidden' };

const ProgressBarFileInput = ({ isLoading = false }: {isLoading: boolean}) => <ProgressBar mode={isLoading ? 'indeterminate' : 'determinate'} style={{ height: '6px' }} />;

const HeaderFileInput = (options: FileUploadHeaderTemplateOptions) => {
  const {
    className, chooseButton, uploadButton, cancelButton,
  } = options;

  return (
    <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
      {chooseButton}
      {uploadButton}
      {cancelButton}
    </div>
  );
};

const ItemFileInput: FileUploadItemTemplateType = ({ name, objectURL }: PrimeFile) => (
  <img alt={name} role="presentation" className="w-full" src={objectURL} />
);

const ItemFileDefault = ({ name, objectURL }: PrimeFile) => () => (
  <img alt={name} role="presentation" className="w-full" src={objectURL} />
);

const EmptyLayout = () => (
  <div className="flex align-items-center flex-column">
    <i
      className="pi pi-image mt-3 p-5"
      style={{
        fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)',
      }}
    />
    <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Arrastre la imagen aqui</span>
  </div>
);

interface FileSingleUploadProps {
  accept?: string,
  onChange?: (files: PrimeFile | null) => void,
  initialValue?: PrimeFile | null
}

export const FileSingleInputApp = ({ accept, onChange, initialValue }: FileSingleUploadProps) => {
  const fileUploadRef = useRef<any>(null);
  const isControlled = useRef(!!onChange);
  const [ initialFile, setInitialFile ] = useState(initialValue);

  const onSelect = () => {
    if (fileUploadRef.current.files.length > 1) {
      fileUploadRef.current.files.shift();
    }

    if (isControlled) {
      onChange!(fileUploadRef.current.files[0]);
    }
  };

  const onClear = () => {
    if (isControlled) {
      onChange!(null);
      setInitialFile(initialValue);
    }
  };

  return (
    <>
      <Tooltip target=".custom-choose-btn" content="Elegir" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Eliminar" position="bottom" />
      <FileUpload
        ref={fileUploadRef}
        name="image[]"
        accept={accept}
        maxFileSize={1000000}
        multiple
        onSelect={onSelect}
        onClear={onClear}
        headerTemplate={HeaderFileInput}
        itemTemplate={ItemFileInput}
        emptyTemplate={initialFile ? ItemFileDefault(initialFile) : EmptyLayout}
        progressBarTemplate={ProgressBarFileInput}
        chooseOptions={chooseOptions}
        cancelOptions={cancelOptions}
        uploadOptions={uploadOptions}
      />
    </>
  );
};

FileSingleInputApp.defaultProps = {
  accept: 'image/*',
  onChange: () => {},
  initialValue: null,
};

export default FileSingleInputApp;
