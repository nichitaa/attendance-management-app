import { IRoutesConfig } from 'auth-react-router';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';

// public
const HomePage = lazy(() => import('@pages/Home/HomePage'));
const LoginPage = lazy(() => import('@pages/Login/LoginPage'));

// private
const DashboardPage = lazy(() => import('@pages/Dashboard/DashboardPage'));
const DepartmentsPage = lazy(
  () => import('@pages/Departments/DepartmentsPage')
);
const EnrollPage = lazy(() => import('@pages/Enroll/EnrollPage'));
const PersonalAttendanceReportPage = lazy(
  () => import('@pages/PersonalAttendanceReport/PersonalAttendanceReportPage')
);
const AttendanceReportPage = lazy(
  () => import('@pages/AttendanceReport/AttendanceReportPage')
);

// common
const PageNotFound = lazy(() => import('@pages/NotFound/PageNotFound'));

export const routes: IRoutesConfig = {
  defaultFallback: <Spin spinning={true} />,
  publicRedirectRoute: '/login',
  privateRedirectRoute: '/dashboard',
  public: [
    {
      path: '/home',
      component: <HomePage />,
    },
    {
      path: '/login',
      component: <LoginPage />,
    },
  ],
  private: [
    {
      path: '/dashboard',
      component: <DashboardPage />,
    },
    {
      path: '/departments',
      component: <DepartmentsPage />,
    },
    {
      path: '/enroll',
      component: <EnrollPage />,
    },
    {
      path: '/attendance',
      component: <AttendanceReportPage />,
    },
    {
      path: '/attendance/:id',
      component: <PersonalAttendanceReportPage />,
    },
  ],
  common: [
    {
      path: '/',
      component: <Navigate to={'/home'} />,
    },
    {
      path: '*',
      component: <PageNotFound />,
    },
  ],
};
