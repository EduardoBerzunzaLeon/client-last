import { useRef } from 'react';

import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadItemTemplateType,
} from 'primereact/fileupload';

interface PrimeFile {
    objectURL: string,
    name: string,
    lastModified: number,
    webkitRelativePath: string,
    size: number,
    type: string
  }

interface Props {
    url: string,
    accept?: string
}

export const FileSingleUpload = ({ url, accept }: Props) => {
  const fileUploadRef = useRef<any>(null);

  const onTemplateSelect = () => {
    if (fileUploadRef.current.files.length > 1) {
      fileUploadRef.current.files.shift();
    }
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
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

  const itemTemplate: FileUploadItemTemplateType = (file: PrimeFile) => (
    <img alt={file.name} role="presentation" style={{ width: '100%' }} src={file.objectURL} />
  );

  const emptyTemplate = () => (
    <div className="flex align-items-center flex-column">
      <i
        className="pi pi-image mt-3 p-5"
        style={{
          fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)',
        }}
      />
      <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">Drag and Drop Image Here</span>
    </div>
  );

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

  return (
    <FileUpload
      ref={fileUploadRef}
      name="image[]"
      url={url}
      accept={accept}
      maxFileSize={1000000}
      multiple
      onSelect={onTemplateSelect}
      headerTemplate={headerTemplate}
      itemTemplate={itemTemplate}
      emptyTemplate={emptyTemplate}
      chooseOptions={chooseOptions}
      uploadOptions={uploadOptions}
      cancelOptions={cancelOptions}
    />
  );
};

FileSingleUpload.defaultProps = {
  accept: 'image/*',
};

export default FileSingleUpload;
