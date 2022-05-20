import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { AdminLayout } from '../../screens/admin/layout/AdminLayout';
import { EmailVerifyScreen } from '../../screens/blank/emailVerify/EmailVerifyScreen';
import { ForgotPasswordScreen } from '../../screens/blank/forgotPasswordScreen/ForgotPasswordScreen';
import { HomeScreen } from '../../screens/admin/home/HomeScreen';
import { LoginScreen } from '../../screens/blank/loginScreen/LoginScreen';
import { PrivateRoute } from '../PrivateRoute';
import { ProfessorsScreen } from '../../screens/admin/professors/ProfessorsScreen';
import { ProfileScreen } from '../../screens/admin/profile/ProfileScreen';
import { PublicRoute } from '../PublicRoute';
import { RegisterScreen } from '../../screens/blank/registerScreen/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/blank/resetPasswordScreen/ResetPasswordScreen';
import { SendEmailVerifyScreen } from '../../screens/blank/sendEmailVerify/SendEmailVerifyScreen';
import { SubjectsScreen } from '../../screens/admin/subjects/SubjectsScreen';
import { UsersScreen } from '../../screens/admin/users/UsersScreen';

const BlankLayoutLazy = lazy(() => import(/* webpackChunkName: "Auth" */'../../screens/blank/layout/BlankLayout'));

export const Routes = () => {
  const routesObject: RouteObject[] = [
    {
      path: '/admin',
      element: <PrivateRoute><AdminLayout /></PrivateRoute>,
      children: [
        {
          index: true,
          element: <HomeScreen />,
        },
        {
          element: <HomeScreen />,
          path: 'home',
        },
        {
          element: <UsersScreen />,
          path: 'users',
        },
        {
          element: <ProfileScreen />,
          path: 'users/:id',
        },
        {
          element: <SubjectsScreen />,
          path: 'subjects',
        },
        {
          element: <ProfessorsScreen />,
          path: 'professors',
        },
      ],
    },
    {
      path: '/',
      element: <PublicRoute><BlankLayoutLazy /></PublicRoute>,
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
        {
          element: <LoginScreen />,
          path: '*',
        },
      ],
    },
  ];

  const route = useRoutes(routesObject);
  return route;
};

export default Routes;
