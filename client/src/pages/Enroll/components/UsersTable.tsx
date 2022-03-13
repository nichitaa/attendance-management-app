import userAPI from '@feature/api/user-api-slice';
import { Button, Row, Space, Table, Tag } from 'antd';
import renderDateCell from '../../../utils/renderDateTimeCell';

const { Column } = Table;
const UsersTable = () => {
  const { data, isLoading } = userAPI.useFetchAllUsersQuery(undefined);

  return (
    <Row gutter={10}>
      <Table
        size={'small'}
        loading={isLoading}
        // @ts-ignore
        dataSource={data}
        rowKey={'id'}
        scroll={{ x: 'max-content' }}
      >
        <Column title={'ID'} dataIndex={'id'} key={'id'} fixed={'left'} />
        <Column title={'Email'} dataIndex={'email'} key={'email'} fixed={'left'} />
        <Column
          title={'First name'}
          dataIndex={'firstName'}
          key={'firstName'}
        />
        <Column title={'Last name'} dataIndex={'lastName'} key={'lastName'} />
        <Column title={'Role'} dataIndex={'role'} key={'role'} />
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
        />
        <Column
          title={'Department'}
          dataIndex={['department', 'name']}
          key={'department_name'}
        />
      </Table>
    </Row>
  );
};

export default UsersTable;
