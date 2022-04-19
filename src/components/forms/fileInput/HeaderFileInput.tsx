import { FileUploadHeaderTemplateOptions } from 'primereact/fileupload';

export const HeaderFileInput = (options: FileUploadHeaderTemplateOptions) => {
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

export default HeaderFileInput;
