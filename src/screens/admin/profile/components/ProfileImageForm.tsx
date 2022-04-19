import React from 'react';

import { Toast } from 'primereact/toast';

import { FileSingleInputApp } from '../../../../components/forms/fileInput/FileSingleInputApp';
import { processError } from '../../../../utils/form/handlerErrorsForms';
import { setDataAuth } from '../../../../redux/auth/auth.slice';
import { useAppDispatch } from '../../../../redux/hooks';
import { useUploadAvatarMutation } from '../../../../redux/user/user.api';
import useToast from '../../../../hooks/useToast';

export const ProfileImageForm = () => {
  const [ uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const { toast, showError, showSuccess } = useToast();
  const dispatch = useAppDispatch();

  const onUpload = async (
    file: File,
    fileUploadRef: React.MutableRefObject<any>,
  ) => {
    const newBanner = new FormData();
    newBanner.append('avatar', file);
    try {
      const { data } = await uploadAvatar(newBanner).unwrap();
      showSuccess({ detail: 'La foto de perfil se actualizó con éxito' });
      dispatch(setDataAuth({ user: data }));
      fileUploadRef.current.clear();
    } catch (error) {
      processError({ error, showError });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <FileSingleInputApp
        onUpload={onUpload}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProfileImageForm;
