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
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: <Private><HomeScreen /></Private>,
        },
        {
          element: <HomeScreen />,
          path: 'home',
        },
      ],
    },
    {
      path: '/',
      element: <BlankLayout />,
      children: [
        {
          index: true,
          element: <Public><LoginScreen /></Public>,
        },
        {
          element: <Public><LoginScreen /></Public>,
          path: 'login',
        },
        {
          element: <Public><RegisterScreen /></Public>,
          path: 'register',
        },
        {
          element: <Public><ForgotPasswordScreen /></Public>,
          path: 'forgot-password',
        },
        {
          element: <Public><ResetPasswordScreen /></Public>,
          path: 'reset-password',
        },
      ],
    },
  ];

  const route = useRoutes(routesObject);
  return route;
};

export default Routes;
