import { useCallback } from 'react';

import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Toast } from 'primereact/toast';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { SlipButton } from '../slipButton/SlipButton';
import { useSignInWithSocialMutation } from '../../redux/auth/auth.api';
import useToast from '../../hooks/useToast';

export const FacebookButton = () => {
  const [ signInSocial, { isLoading }] = useSignInWithSocialMutation();
  const { toast, showError } = useToast();

  const responseFacebook = useCallback((
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    if ('accessToken' in response) {
      signInSocial({
        socialName: 'facebook',
        tokenId: response.accessToken,
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
      <FacebookLogin
        appId={process.env.REACT_APP_CLIENT_ID_FACEBOOK || ''}
        callback={responseFacebook}
        render={(renderProps) => (
          <SlipButton
            color="indigo"
            icon="facebook"
            label="Facebook"
            isLoading={isLoading}
            onClick={renderProps.onClick}
          />
        )}
      />
    </>
  );
};

export default FacebookButton;
