import departmentsAPI from '@feature/api/departments-api-slice';
import { Button, Row, Space, Table } from 'antd';
import renderDateCell from '../../../utils/renderDateTimeCell';
import { FC } from 'react';

const { Column } = Table;

interface MainProps {
  openUpdateRecordModal: (record: any) => void;
}

const DepartmentsTable: FC<MainProps> = ({ openUpdateRecordModal }) => {
  const { data, isLoading } = departmentsAPI.useFetchAllDepartmentsQuery(undefined);

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
        <Column title={'ID'} dataIndex={'id'} key={'id'} />
        <Column title={'Name'} dataIndex={'name'} key={'name'} />
        <Column
          title={'Created At'}
          dataIndex={'createdAt'}
          key={'createdAt'}
          render={renderDateCell}
        />
        <Column
          title={'Actions'}
          key={'action'}
          render={(record) => (
            <Space>
              <Button
                size={'small'}
                onClick={() => openUpdateRecordModal(record)}
              >
                Update
              </Button>
            </Space>
          )}
        />
      </Table>
    </Row>
  );
};

export default DepartmentsTable;
