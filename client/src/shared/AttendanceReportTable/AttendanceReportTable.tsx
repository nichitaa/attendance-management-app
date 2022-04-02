import { Button, Table, Tag, Typography } from 'antd';
import { msToTime } from '../../utils/msToTime';
import renderDateCell from '../../utils/renderDateTimeCell';
import { FC } from 'react';
import { UserRoles } from '../../types/enums';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { Column } = Table;

interface MainProps {
  loading: boolean;
  dataSource: any[];
  isAdminReport: boolean;
}

const AttendanceReportTable: FC<MainProps> = ({
  loading,
  dataSource,
  isAdminReport,
}) => {
  const navigate = useNavigate();
  console.log(dataSource);
  return (
    <Table
      size={'small'}
      pagination={false}
      loading={loading}
      // @ts-ignore
      dataSource={dataSource}
      rowKey={'id'}
      scroll={{ x: 'max-content' }}
      summary={(tableData) => {
        let total = 0;
        tableData.forEach(({ totalRegisteredTime }) => {
          total += totalRegisteredTime;
        });
        return (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={isAdminReport ? 8 : 3}>
              Total
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1}>
              <Text type={'secondary'}>{msToTime(total)}</Text>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        );
      }}
    >
      <Column title={'ID'} dataIndex={'id'} key={'id'} fixed={'left'} />
      {isAdminReport && (
        <>
          <Column
            title={'First name'}
            dataIndex={['user', 'firstName']}
            key={'firstName'}
          />
          <Column
            title={'Last name'}
            dataIndex={['user', 'lastName']}
            key={'lastName'}
          />
          <Column
            title={'Email'}
            dataIndex={['user', 'email']}
            key={'userEmail'}
          />
          <Column
            title={'Role'}
            dataIndex={['user', 'role']}
            key={'userRole'}
            render={(role) => {
              if (role === UserRoles.ADMIN)
                return <Tag color={'purple'}>Organization admin</Tag>;
              if (role === UserRoles.DEPARTMENT_ADMIN)
                return <Tag color={'gold'}>Department admin</Tag>;
              if (role === UserRoles.DEFAULT)
                return <Tag color={'blue'}>Regular user</Tag>;
            }}
          />
          <Column
            title={'Department'}
            dataIndex={['user', 'department', 'name']}
            key={'userDepartment'}
            render={(item) => <Tag color={'cyan'}>{item}</Tag>}
          />
        </>
      )}
      <Column
        title={'Start time'}
        dataIndex={'startTime'}
        key={'startTime'}
        render={renderDateCell}
      />
      <Column
        title={'End time'}
        dataIndex={'endTime'}
        key={'endTime'}
        render={renderDateCell}
      />
      <Column
        title={'Total registered time'}
        dataIndex={'totalRegisteredTime'}
        key={'totalRegisteredTime'}
        render={(ms) => msToTime(ms)}
      />
      {isAdminReport && (
        <Column
          title={'Actions'}
          key={'actions'}
          render={(record) => (
            <Button
              size={'small'}
              onClick={() => navigate(`/attendance/${record.userId}`)}
            >
              details
            </Button>
          )}
        />
      )}
    </Table>
  );
};

export default AttendanceReportTable;
