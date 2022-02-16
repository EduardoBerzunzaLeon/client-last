import type { RouteObject } from 'react-router-dom';

import { useRoutes } from 'react-router-dom';

import Private from '../PrivateRoute';
import Public from '../PublicRoute';

import AdminLayout from '../../screens/admin/layout/AdminLayout';
import BlankLayout from '../../screens/blank/layout/BlankLayout';
import EmailVerifyScreen from '../../screens/blank/emailVerify/EmailVerifyScreen';
import ForgotPasswordScreen from '../../screens/blank/forgotPasswordScreen/ForgotPasswordScreen';
import HomeScreen from '../../screens/admin/home/HomeScreen';
import LoginScreen from '../../screens/blank/loginScreen/LoginScreen';
import RegisterScreen from '../../screens/blank/registerScreen/RegisterScreen';
import ResetPasswordScreen from '../../screens/blank/resetPasswordScreen/ResetPasswordScreen';
import SendEmailVerifyScreen from '../../screens/blank/sendEmailVerify/SendEmailVerifyScreen';

const Routes = () => {
  const routesObject: RouteObject[] = [
    {
      path: '/admin',
      element: <Private><AdminLayout /></Private>,
      children: [
        {
          index: true,
          element: <HomeScreen />,
        },
        {
          element: <HomeScreen />,
          path: 'home',
        },
      ],
    },
    {
      path: '/',
      element: <Public><BlankLayout /></Public>,
      children: [
        {
          index: true,
          element: <LoginScreen />,
        },
        {
          element: <LoginScreen />,
          path: 'login',
        },
        {
          element: <RegisterScreen />,
          path: 'register',
        },
        {
          element: <EmailVerifyScreen />,
          path: 'email-verify/:token',
        },
        {
          element: <SendEmailVerifyScreen />,
          path: 'send-email-verify',
        },
        {
          element: <ForgotPasswordScreen />,
          path: 'forgot-password',
        },
        {
          element: <ResetPasswordScreen />,
          path: 'reset-password/:token',
        },
      ],
    },
  ];

  const route = useRoutes(routesObject);
  return route;
};

export default Routes;
