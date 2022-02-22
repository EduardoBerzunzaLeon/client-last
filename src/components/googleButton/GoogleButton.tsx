import { useCallback } from 'react';
import { Toast } from 'primereact/toast';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { setCredentials } from '../../redux/auth/auth.slice';
import { SlipButton } from '../slipButton/SlipButton';
import { useAppDispatch } from '../../redux/hooks';
import { useSignInWithSocialMutation } from '../../redux/auth/auth.api';
import useToast from '../../hooks/useToast';
import { getDetailError } from '../../redux/services/handlerErrorApi';

export const GoogleButton = () => {
  const dispatch = useAppDispatch();
  const [ signInSocial, { isLoading }] = useSignInWithSocialMutation();
  const { toast, showError } = useToast();

  const responseGoogle = useCallback((
    response: GoogleLoginResponse | GoogleLoginResponseOffline,
  ) => {
    console.log(response);
    if ('tokenId' in response) {
      signInSocial({
        socialName: 'google',
        tokenId: response.tokenId,
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
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </>
  );
};

export default { GoogleButton };
