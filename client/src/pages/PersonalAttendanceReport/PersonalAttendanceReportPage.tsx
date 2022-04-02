import { PageHeader } from '@shared/index';
import { PersonalAttendanceTable } from './components';

const PersonalAttendanceReportPage = () => {
  return (
    <>
      <PageHeader title={'Personal attendance report'} />
      <PersonalAttendanceTable />
    </>
  );
};

export default PersonalAttendanceReportPage;
