import { useCallback } from 'react';

import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Toast } from 'primereact/toast';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { setCredentials } from '../../redux/auth/auth.slice';
import { SlipButton } from '../slipButton/SlipButton';
import { useAppDispatch } from '../../redux/hooks';
import { useSignInWithSocialMutation } from '../../redux/auth/auth.api';
import useToast from '../../hooks/useToast';
import { getDetailError } from '../../redux/services/handlerErrorApi';

export const FacebookButton = () => {
  const dispatch = useAppDispatch();
  const [ signInSocial, { isLoading }] = useSignInWithSocialMutation();
  const { toast, showError } = useToast();

  const responseFacebook = useCallback((
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    if ('accessToken' in response) {
      signInSocial({
        socialName: 'facebook',
        tokenId: response.accessToken,
      }).unwrap().then(
        (element) => {
          dispatch(setCredentials(element));
        },
      ).catch((e) => {
        const detail: string = getDetailError(e);
        showError({
          summary: 'Error',
          detail,
        });
      });
    } else {
      showError({
        summary: 'Error',
        detail: 'Ocurrio un error en el servicio de Facebook, favor de intentarlo mas tarde.',
      });
    }
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <FacebookLogin
        appId={process.env.REACT_APP_CLIENT_ID_FACEBOOK || ''}
        callback={responseFacebook}
        render={(renderProps) => (
          <SlipButton
            color="indigo"
            icon="facebook"
            label="Facebook"
            loading={isLoading}
            onClick={renderProps.onClick}
          />
        )}
      />
    </>
  );
};

export default FacebookButton;
