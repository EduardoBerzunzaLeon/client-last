/// <reference types="react-scripts" />
declare module 'react-facebook-login/dist/facebook-login-render-props' {

  interface ReactFacebookFailureResponse {
    status?: string;
  }

  interface ReactFacebookLoginInfo {
    id: string;
    accessToken: string;
    name?: string;
    email?: string;
  }

  interface ReactFacebookLoginState {
    isSdkLoaded?: boolean;
    isProcessing?: boolean;
  }

  export interface RenderProps {
      onClick:
        // eslint-disable-next-line no-undef
        | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
        | undefined;
      isDisabled: boolean;
      isProcessing: boolean;
      isSdkLoaded: boolean;
    }

    interface ReactFacebookLoginProps {
      appId: string;
      callback(userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse): void;
      onFailure?(response: ReactFacebookFailureResponse): void;
      autoLoad?: boolean;
      // eslint-disable-next-line no-undef
      buttonStyle?: React.CSSProperties;
      // eslint-disable-next-line no-undef
      containerStyle?: React.CSSProperties;
      cookie?: boolean;
      cssClass?: string;
      disableMobileRedirect?: boolean;
      fields?: string;
      // eslint-disable-next-line no-undef
      icon?: string | React.ReactNode;
      isDisabled?: boolean;
      language?: string;
      // eslint-disable-next-line no-undef
      onClick?(event: React.MouseEvent<HTMLDivElement>): void;
      reAuthenticate?: boolean;
      redirectUri?: string;
      scope?: string;
      size?: 'small' | 'medium' | 'metro';
      textButton?: string;
      typeButton?: string;
      version?: string;
      xfbml?: boolean;
      isMobile?: boolean;
      // eslint-disable-next-line no-undef
      tag?: Node | React.Component<any>;
      render(props: RenderProps): void;
    }

    // eslint-disable-next-line react/prefer-stateless-function
    export default class ReactFacebookLogin
    // eslint-disable-next-line no-undef
      extends React.Component<
      ReactFacebookLoginProps,
      ReactFacebookLoginState
    > {}
  }
