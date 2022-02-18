import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { SlipButton } from '../slipButton/SlipButton';

export const GoogleButton = () => {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in response) {
      console.log('ok');
    } else {
      console.log('error');
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_CLIENT_ID_GOOGLE || ''}
      render={(renderProps) => (
        <SlipButton
          color="purple"
          icon="google"
          label="Google"
          onClick={renderProps.onClick}
        />
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default { GoogleButton };
