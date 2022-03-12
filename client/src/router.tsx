import { IRoutesConfig } from 'auth-react-router';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';

// public
const DashboardPage = lazy(() => import('@pages/Dashboard/DashboardPage'));

// common
const HomePage = lazy(() => import('@pages/Home/HomePage'));
const LoginPage = lazy(() => import('@pages/Login/LoginPage'));
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
  ],
  common: [
    {
      path: '/',
      component: <Navigate to={'/home'} />,
    },
    {
      path: '/asdf',
      component: <p>asdf</p>
    }
    // {
    //   path: '*',
    //   component: <PageNotFound />,
    // },
  ],
};