import type { RouteObject } from 'react-router-dom';

import { useRoutes } from 'react-router-dom';

import HomeScreen from '../../screens/admin/home/HomeScreen';
import AdminLayout from '../../screens/admin/layout/AdminLayout';
import BlankLayout from '../../screens/blank/layout/BlankLayout';
import LoginScreen from '../../screens/blank/loginScreen/LoginScreen';
import RegisterScreen from '../../screens/blank/registerScreen/RegisterScreen';

import Private from '../PrivateRoute';

import Public from '../PublicRoute';
import ForgotPasswordScreen from '../../screens/blank/forgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from '../../screens/blank/resetPasswordScreen/ResetPasswordScreen';

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
          element: <ForgotPasswordScreen />,
          path: 'forgot-password',
        },
        {
          element: <ResetPasswordScreen />,
          path: 'reset-password',
        },
      ],
    },
  ];

  const route = useRoutes(routesObject);
  return route;
};

export default Routes;
