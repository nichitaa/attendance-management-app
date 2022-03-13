import { PageHeader } from '@shared/index';
import { UsersTable } from './components';

const EnrollPage = () => {
  return (
    <>
      <PageHeader title={'Enroll'}/>
      <UsersTable/>
    </>
  );
};

export default EnrollPage;