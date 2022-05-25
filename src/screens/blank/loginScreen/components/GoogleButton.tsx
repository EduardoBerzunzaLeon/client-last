import { useCallback } from 'react';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Toast } from 'primereact/toast';

import { CLIENT_ID_GOOGLE } from '../../../../config/enviroment';
import { processError } from '../../../../utils/forms/handlerFormErrors';
import { SlipButton } from '../../../../components/slipButton/SlipButton';
import { useSignInWithSocialMutation } from '../../../../redux/auth/auth.api';
import { useToast } from '../../../../hooks/useToast';

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
      }).unwrap().catch((error) => {
        processError({ error, showError });
      });
    } else {
      showError({ detail: 'Ocurrio un error en el servicio de Google, favor de intentarlo mas tarde.' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responseErrorGoogle = useCallback((
    response: any,
  ) => {
    if ('error' in response) {
      response.error !== 'idpiframe_initialization_failed'
        && showError({ detail: 'Ocurrio un error en el servicio de Google, favor de intentarlo mas tarde.' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <GoogleLogin
        clientId={CLIENT_ID_GOOGLE}
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

export default GoogleButton;
