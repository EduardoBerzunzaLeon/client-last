import { useRef } from 'react';

import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadItemTemplateType,
  FileUploadHandlerParam,
} from 'primereact/fileupload';

import { Tooltip } from 'primereact/tooltip';
import { useUploadAvatarMutation } from '../../redux/user/user.api';

interface PrimeFile {
    objectURL: string,
    name: string,
    lastModified: number,
    webkitRelativePath: string,
    size: number,
    type: string
  }

interface Props {
    accept?: string
}

export const FileSingleUpload = ({ accept }: Props) => {
  const fileUploadRef = useRef<any>(null);
  const [ uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const onTemplateSelect = () => {
    if (fileUploadRef.current.files.length > 1) {
      fileUploadRef.current.files.shift();
    }
  };

  const onTemplateUpload = async (e: FileUploadHandlerParam) => {
    const newBanner = new FormData();
    newBanner.append('avatar', e.files[0]);
    try {
      const element = await uploadAvatar(newBanner).unwrap();
      console.log(element);
    } catch (error) {
      console.log(error);
    }
    console.log(isLoading);
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
    <>
      <Tooltip target=".custom-choose-btn" content="Elegir" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Actualizar" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Eliminar" position="bottom" />
      <FileUpload
        ref={fileUploadRef}
        name="image[]"
        accept={accept}
        maxFileSize={1000000}
        multiple
        customUpload
        uploadHandler={onTemplateUpload}
        onSelect={onTemplateSelect}
        // onUpload={onTemplateUpload}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </>
  );
};

FileSingleUpload.defaultProps = {
  accept: 'image/*',
};

export default FileSingleUpload;
