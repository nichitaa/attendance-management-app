import { AppRouter, Routes } from 'auth-react-router';
import { routes } from './router';
import AppLayout from './layout/AppLayout';
import { useAppSelector } from '@hooks/rtk-hooks';

const App = () => {
  const { isAuthorized } = useAppSelector((s) => s.authorization);

  return (
    <AppLayout>
      <AppRouter routes={routes} isAuth={isAuthorized}>
        <Routes />
      </AppRouter>
    </AppLayout>
  );
};

export default App;