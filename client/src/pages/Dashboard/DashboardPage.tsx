import { Button, message } from 'antd';
import { useAppSelector } from '@hooks/rtk-hooks';
import attendanceAPI from '@feature/api/attendance-api-slice';
import { PageHeader } from '@shared/index';

const DashboardPage = () => {
  const { fingerprintId } = useAppSelector((s) => s.authorization);
  const [
    registerAttendanceMutation,
    { isLoading: isRegisterAttendanceLoading },
  ] = attendanceAPI.useRegisterAttendanceMutation();

  const registerAttendanceHandler = async () => {
    const response = await registerAttendanceMutation({ fingerprintId });

    if ('error' in response) {
      return message.error(response['error']['data'].error, 3);
    }
    return message.success(response.data.message, 3);
  };

  return (
    <>
      <PageHeader
        title={'Dashboard'}
        extra={[
          <Button
            type={'primary'}
            onClick={registerAttendanceHandler}
            loading={isRegisterAttendanceLoading}
            disabled={isRegisterAttendanceLoading}
          >
            Register attendance
          </Button>,
        ]}
      />
    </>
  );
};

export default DashboardPage;
