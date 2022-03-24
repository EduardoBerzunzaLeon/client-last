import { useCallback } from 'react';

import { Toast } from 'primereact/toast';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { getDetailError } from '../../../../redux/services/handlerErrorApi';
import { SlipButton } from '../../../../components/slipButton/SlipButton';
import { useSignInWithSocialMutation } from '../../../../redux/auth/auth.api';
import useToast from '../../../../hooks/useToast';

export const GoogleButton = () => {
  const [ signInSocial, { isLoading }] = useSignInWithSocialMutation();
  const { toast, showError } = useToast();

  const responseGoogle = useCallback((
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    if ('tokenId' in response) {
      signInSocial({
        socialName: 'google',
        tokenId: response.tokenId,
      }).unwrap().catch((e) => {
        const detail: string = getDetailError(e);
        showError({
          summary: 'Error',
          detail,
        });
      });
    } else {
      showError({
        summary: 'Error',
        detail: 'Ocurrio un error en el servicio de Google, favor de intentarlo mas tarde.',
      });
    }
  }, []);

  const responseErrorGoogle = useCallback((
    response: any,
  ) => {
    if ('error' in response) {
      response.error !== 'idpiframe_initialization_failed'
        && showError({
          summary: 'Error',
          detail: 'Ocurrio un error en el servicio de Google, favor de intentarlo mas tarde.',
        });
    }
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE || ''}
        render={(renderProps) => (
          <SlipButton
            color="purple"
            icon="google"
            label="Google"
            loading={isLoading}
            onClick={renderProps.onClick}
          />
        )}
        onSuccess={responseGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy="single_host_origin"
      />
    </>
  );
};

export default { GoogleButton };
