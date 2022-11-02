import React, { useRef } from 'react';

import {
  FileUpload,
  FileUploadHandlerParam,
  FileUploadOptionsType,
} from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import { Tag } from 'primereact/tag';

import { Button } from 'primereact/button';
import { EmptyLayout } from './EmptyLayout';
import { HeaderFileInput } from './HeaderFileInput';
import { ProgressBarFileControlledInput, ProgressBarFileInput } from './ProgressBarFileInput';
import { useFile } from '../../../hooks';
import { ItemImageDefault } from './ItemFileInput';
import { PrimeFile } from '../../../interfaces';

const cancelOptionsDefault = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
const chooseOptionsDefault = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
const uploadOptionsDefault = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };

interface FileSingleUploadProps {
  accept?: string,
  initialValue?: string,
  initialFile?: File,
  isLoading?: boolean | undefined,
  hasPersistence?: boolean,
  emptyLabel?: string,
  cancelOptions?: FileUploadOptionsType,
  chooseOptions?: FileUploadOptionsType,
  uploadOptions?: FileUploadOptionsType,
  onChange?: (files: File | null) => void,
  onUpload?: (file: File, fileUplodRed: React.MutableRefObject<any>) => void,
}

export const FileSingleInputApp = ({
  accept,
  cancelOptions,
  chooseOptions,
  emptyLabel,
  initialValue,
  initialFile,
  isLoading,
  onChange,
  onUpload,
  uploadOptions,
  hasPersistence,
}: FileSingleUploadProps) => {
  const fileUploadRef = useRef<any>(null);
  const isControlled = useRef(Boolean(onChange));

  const { file, setIsLoaded, setFile } = useFile({
    url: initialValue,
    name: 'imagen.png',
  });

  const onSelect = () => {
    if (fileUploadRef.current.files.length > 1) {
      fileUploadRef.current.files.shift();
    }

    if (isControlled) {
      onChange!(fileUploadRef.current.files[0]);
    }

    setIsLoaded(true);
  };

  const onTemplateUpload = async (e: FileUploadHandlerParam) => {
    if (onUpload) {
      onUpload(e.files[0], fileUploadRef);
    }
  };

  const onClear = () => {
    if (!hasPersistence) {
      setFile(undefined);
    }

    if (isControlled) {
      onChange!(null);
    }
  };

  const onTemplateRemove = (_file: any, callback: any) => {
    callback();
    onClear();
  };

  // eslint-disable-next-line no-shadow
  const itemTemplate = (file: any, options: any) => (
    <div className="p-d-flex p-ai-center p-flex-wrap">
      <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
        <span className="p-d-flex p-dir-col p-text-left p-ml-3">
          {file.name}
          <small>{new Date().toLocaleDateString()}</small>
        </span>
      </div>
      <Tag value={`${file.size} KB`} severity="warning" className="p-px-3 p-py-2" />
      <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, options?.onRemove ?? options.onClear)} />
    </div>
  );

  const getItemTemplate = (f: PrimeFile | File, options: any) => {
    if (f?.type.startsWith('image')) return ItemImageDefault(f as PrimeFile);
    if (f) return itemTemplate(f as File, options);
    return null;
  };

  const getEmptyTemplate = (options: any) => {
    if (initialFile) return getItemTemplate(initialFile, options);
    if (file) return getItemTemplate(file, options);
    return EmptyLayout({ label: emptyLabel || '' });
  };

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
        onSelect={onSelect}
        onClear={onClear}
        headerTemplate={HeaderFileInput}
        itemTemplate={getItemTemplate}
        emptyTemplate={(options: any) => getEmptyTemplate(options)}
        progressBarTemplate={typeof isLoading !== 'undefined'
          ? ProgressBarFileControlledInput({ isLoading })
          : ProgressBarFileInput}
        customUpload
        uploadHandler={onTemplateUpload}
        chooseOptions={chooseOptions}
        cancelOptions={cancelOptions}
        uploadOptions={uploadOptions}
      />
    </>
  );
};

FileSingleInputApp.defaultProps = {
  accept: 'image/*',
  initialValue: '',
  initialFile: undefined,
  isLoading: undefined,
  hasPersistence: true,
  emptyLabel: 'Arrastre la imagen aqui',
  cancelOptions: cancelOptionsDefault,
  chooseOptions: chooseOptionsDefault,
  uploadOptions: uploadOptionsDefault,
  onChange: () => {},
  onUpload: () => {},
};

export default FileSingleInputApp;
