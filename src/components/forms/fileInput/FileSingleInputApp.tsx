import React, { useRef, useEffect } from 'react';

import {
  FileUpload,
  FileUploadHandlerParam,
} from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';

import { EmptyLayout } from './EmptyLayout';
import { HeaderFileInput } from './HeaderFileInput';
import { ItemFileDefault, ItemFileInput } from './ItemFileInput';
import { ProgressBarFileControlledInput, ProgressBarFileInput } from './ProgressBarFileInput';
import { useFile } from '../../../hooks/useFile';

const cancelOptionsDefault = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
const chooseOptionsDefault = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
const uploadOptionsDefault = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };

interface OptionsProps {
  icon: string,
  iconOnly: boolean,
  className: string
}

interface FileSingleUploadProps {
  accept?: string,
  initialValue?: string,
  isLoading?: boolean | undefined,
  cancelOptions?: OptionsProps,
  chooseOptions?: OptionsProps,
  uploadOptions?: OptionsProps,
  onChange?: (files: File | null) => void,
  onUpload?: (file: File, fileUplodRed: React.MutableRefObject<any>) => void
}

export const FileSingleInputApp = ({
  accept,
  initialValue,
  cancelOptions,
  chooseOptions,
  uploadOptions,
  onChange,
  onUpload,
  isLoading,
}: FileSingleUploadProps) => {
  const fileUploadRef = useRef<any>(null);
  const isControlled = useRef(!!onChange);

  console.log(initialValue);
  const { file, setIsLoaded } = useFile({
    url: initialValue,
    name: 'imagen.png',
  });

  useEffect(() => {
    if (!file && fileUploadRef.current.files) {
      fileUploadRef.current.clear();
    }
  }, [ file ]);

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
    if (isControlled) {
      onChange!(null);
    }
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
        itemTemplate={ItemFileInput}
        emptyTemplate={file
          ? ItemFileDefault(file)
          : EmptyLayout}
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
  isLoading: undefined,
  cancelOptions: cancelOptionsDefault,
  chooseOptions: chooseOptionsDefault,
  uploadOptions: uploadOptionsDefault,
  onChange: () => {},
  onUpload: () => {},
};

export default FileSingleInputApp;
