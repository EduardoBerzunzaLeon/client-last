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
import { ProfileProfessorScreen } from '../../screens/admin/profileProfessor/ProfileProfessorScreen';
import { PermissionsGate } from '../../components/authorization/PermissionGate';
import { ErrorCard } from '../../components/errorCard/ErrorCard';
import { StudentsScreen } from '../../screens/admin/students/StudentsScreen';

const BlankLayoutLazy = lazy(() => import(/* webpackChunkName: "Auth" */'../../screens/blank/layout/BlankLayout'));

const fallback = (
  <ErrorCard
    title="Ocurrio un error en su petición"
    detail="No tiene permiso para realizar esta operación"
  />
);

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
          element: <PermissionsGate fallback={fallback} module="user" permission="canView"><UsersScreen /></PermissionsGate>,
          path: 'users',
        },
        {
          element: <ProfileScreen />,
          path: 'users/:id',
        },
        {
          element: <PermissionsGate fallback={fallback} module="subject" permission="canView"><SubjectsScreen /></PermissionsGate>,
          path: 'subjects',
        },
        {
          element: <PermissionsGate fallback={fallback} module="professor" permission="canView"><ProfessorsScreen /></PermissionsGate>,
          path: 'professors',
        },
        {
          element: <PermissionsGate fallback={fallback} module="professor" permission="canView"><ProfileProfessorScreen /></PermissionsGate>,
          path: 'professors/:id',
        },
        {
          element: <PermissionsGate fallback={fallback} module="student" permission="canView"><StudentsScreen /></PermissionsGate>,
          path: 'students',
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
