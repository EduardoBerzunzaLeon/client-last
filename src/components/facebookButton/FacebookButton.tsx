import { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { SlipButton } from '../slipButton/SlipButton';

// (renderProps: any) => JSX.Element
// (event: React.MouseEvent<HTMLDivElement>): void;
export const FacebookButton = () => {
  const responseFacebook = useCallback((
    response: ReactFacebookLoginInfo | ReactFacebookFailureResponse,
  ) => {
    if ('accessToken' in response) {
      console.log('¿ah');
    } else {
      console.log('error');
    }
  }, []);

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_CLIENT_ID_FACEBOOK || ''}
      callback={responseFacebook}
      render={(renderProps) => (
        <SlipButton
          color="indigo"
          icon="facebook"
          label="Facebook"
          onClick={renderProps.onClick}
        />
      )}
    />
  );
};

export default FacebookButton;
