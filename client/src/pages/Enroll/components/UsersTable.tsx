import userAPI from '@feature/api/user-api-slice';
import { Table, Tag } from 'antd';
import renderDateCell from '../../../utils/renderDateTimeCell';
import { UserRoles } from '../../../types/enums';

const { Column } = Table;
const UsersTable = () => {
  const { data, isLoading } = userAPI.useFetchAllUsersQuery(undefined);
  console.log(data);
  return (
    <Table
      size={'small'}
      loading={isLoading}
      // @ts-ignore
      dataSource={data}
      rowKey={'id'}
      scroll={{ x: 'max-content' }}
    >
      <Column title={'ID'} dataIndex={'id'} key={'id'} fixed={'left'} />
      <Column
        title={'Email'}
        dataIndex={'email'}
        key={'email'}
        fixed={'left'}
      />
      <Column title={'First name'} dataIndex={'firstName'} key={'firstName'} />
      <Column title={'Last name'} dataIndex={'lastName'} key={'lastName'} />
      <Column
        title={'Role'}
        dataIndex={'role'}
        key={'role'}
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
        title={'Date of birth'}
        dataIndex={'dateOfBirth'}
        key={'dateOfBirth'}
        render={renderDateCell}
      />
      <Column title={'PIN'} dataIndex={'PIN'} key={'PIN'} />
      <Column
        title={'Fingerprint registered'}
        dataIndex={'fingerprintId'}
        key={'fingerprintId'}
        render={(data) =>
          !data ? (
            <Tag color={'volcano'}>NO</Tag>
          ) : (
            <Tag color={'green'}>YES</Tag>
          )
        }
      />
      <Column
        title={'Created at'}
        dataIndex={'createdAt'}
        key={'createdAt'}
        render={renderDateCell}
      />
      <Column
        title={'Department'}
        dataIndex={['department', 'name']}
        key={'department_name'}
      />
    </Table>
  );
};

export default UsersTable;
