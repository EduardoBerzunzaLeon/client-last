import React, { useContext } from 'react';

import { FileSingleInputApp } from '../forms';
import { processError } from '../../utils';
import { setDataAuth } from '../../redux/auth/auth.slice';
import { ToastContext } from '../../context';

import { useUploadAvatarMutation } from '../../redux/user/user.api';
import { useAppDispatch } from '../../redux/hooks';

export const ProfileImageForm = () => {
  const [ uploadAvatar, { isLoading }] = useUploadAvatarMutation();

  const { showSuccess, showError } = useContext(ToastContext);
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
    <FileSingleInputApp
      onUpload={onUpload}
      isLoading={isLoading}
    />
  );
};

export default ProfileImageForm;
