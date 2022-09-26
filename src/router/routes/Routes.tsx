import { lazy } from 'react';

import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { AdminLayout } from '../../screens/admin/layout/AdminLayout';
import { EmailVerifyScreen } from '../../screens/blank/emailVerify/EmailVerifyScreen';
import { ErrorCard } from '../../components/ui';
import { ForgotPasswordScreen } from '../../screens/blank/forgotPasswordScreen/ForgotPasswordScreen';
import { HomeScreen } from '../../screens/admin/home/HomeScreen';
import { LoginScreen } from '../../screens/blank/loginScreen/LoginScreen';
import { PermissionsGate } from '../../components/authorization/PermissionGate';
import { PrivateRoute } from '../PrivateRoute';
import { PublicRoute } from '../PublicRoute';
import { RegisterScreen } from '../../screens/blank/registerScreen/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/blank/resetPasswordScreen/ResetPasswordScreen';
import { SendEmailVerifyScreen } from '../../screens/blank/sendEmailVerify/SendEmailVerifyScreen';

import { ToastProvider } from '../../context';

const BlankLayoutLazy = lazy(() => import(/* webpackChunkName: "Auth" */'../../screens/blank/layout/BlankLayout'));
const UserScreenLazy = lazy(() => import(/* webpackChunkName: "User" */'../../screens/admin/users/UsersScreen'));
const ProfileScreenLazy = lazy(() => import(/* webpackChunkName: "Profile" */'../../screens/admin/profile/ProfileScreen'));
const SubjectsScreenLazy = lazy(() => import(/* webpackChunkName: "Subjects" */'../../screens/admin/subjects/SubjectsScreen'));
const ProfessorsScreenLazy = lazy(() => import(/* webpackChunkName: "Professors" */'../../screens/admin/professors/ProfessorsScreen'));
const StudentsScreenLazy = lazy(() => import(/* webpackChunkName: "Students" */'../../screens/admin/students/StudentsScreen'));
const SubjectHistoryScreenLazy = lazy(() => import(/* webpackChunkName: "SubjectsHistory" */'../../screens/admin/subjectHistory/SubjectHistoryScreen'));

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
      element: <PrivateRoute><ToastProvider><AdminLayout /></ToastProvider></PrivateRoute>,
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
          element: <PermissionsGate fallback={fallback} module="user" permission="canView"><UserScreenLazy /></PermissionsGate>,
          path: 'users',
        },
        {
          element: <ProfileScreenLazy />,
          path: 'users/:id',
        },
        {
          element: <PermissionsGate fallback={fallback} module="subject" permission="canView"><SubjectsScreenLazy /></PermissionsGate>,
          path: 'subjects',
        },
        {
          element: <PermissionsGate fallback={fallback} module="professor" permission="canView"><ProfessorsScreenLazy /></PermissionsGate>,
          path: 'professors',
        },
        {
          element: <PermissionsGate fallback={fallback} module="student" permission="canView"><StudentsScreenLazy /></PermissionsGate>,
          path: 'students',
        },
        {
          element: <PermissionsGate fallback={fallback} module="subjectHistory" permission="canView"><SubjectHistoryScreenLazy /></PermissionsGate>,
          path: 'students/:userId',
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
