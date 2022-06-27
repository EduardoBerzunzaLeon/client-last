import { useCallback } from 'react';

import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { Toast } from 'primereact/toast';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import { CLIENT_ID_FACEBOOK } from '../../../../config/enviroment';
import { processError } from '../../../../utils';
import { SlipButton } from '../../../../components/ui';

import { useSignInWithSocialMutation } from '../../../../redux/auth/auth.api';
import { useToast } from '../../../../hooks';

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
      }).unwrap()
        .catch((error) => {
          processError({ error, showError });
        });
    } else {
      showError({ detail: 'Ocurrio un error en el servicio de Facebook, favor de intentarlo mas tarde.' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return (
    <>
      <Toast ref={toast} />
      <FacebookLogin
        appId={CLIENT_ID_FACEBOOK}
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
