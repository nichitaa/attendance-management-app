import { AppRouter, Routes } from 'auth-react-router';
import { routes } from './router';
import AppLayout from './layout/AppLayout';

const App = () => {
  return (
    <AppRouter routes={routes} isAuth={false}>
      <AppLayout>
        <Routes />
      </AppLayout>
    </AppRouter>
  );
};

export default App;