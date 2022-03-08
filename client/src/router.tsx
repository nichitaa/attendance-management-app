import { IRoutesConfig } from 'auth-react-router';
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// common
const HomePage = lazy(() => import('@pages/Home/HomePage'));

export const routes: IRoutesConfig = {
  defaultFallback: <p>loading...</p>,
  common: [
    { path: '/', component: <Navigate to={'/home'} /> },
    {
      path: '/home',
      component: <HomePage />,
    }],
};