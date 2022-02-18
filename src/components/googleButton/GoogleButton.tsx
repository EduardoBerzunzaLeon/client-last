import { useCallback } from 'react';
import { Toast } from 'primereact/toast';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { SlipButton } from '../slipButton/SlipButton';
import { useSignInWithSocialMutation } from '../../redux/auth/auth.api';
import useToast from '../../hooks/useToast';

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
      });
    } else {
      showError({
        detail: 'error',
        summary: 'error',
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
            isLoading={isLoading}
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
