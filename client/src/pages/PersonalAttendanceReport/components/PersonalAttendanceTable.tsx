import { Col, DatePicker, Row, Space, Table, Typography } from 'antd';
import { useAppSelector } from '@hooks/rtk-hooks';
import attendanceAPI from '@feature/api/attendance-api-slice';
import renderDateCell from '../../../utils/renderDateTimeCell';
import { msToTime } from '../../../utils/msToTime';
import { useState } from 'react';

const { Column } = Table;
const { Text } = Typography;
const { RangePicker } = DatePicker;

interface IReportFilters {
  id: number;
  filters: {
    from?: string;
    to?: string;
  };
}

const PersonalAttendanceTable = () => {
  const { userId } = useAppSelector((s) => s.authorization);
  const [queryFilters, setQueryFilters] = useState<IReportFilters>({
    id: userId,
    filters: {},
  });

  const { data, isLoading } =
    attendanceAPI.useFetchAttendancesByUserQuery(queryFilters);

  const onDatesChangeHandler = async (dates) => {
    if (!dates) {
      setQueryFilters((prev) => ({ ...prev, filters: {} }));
    } else {
      setQueryFilters((prev) => ({
        ...prev,
        filters: {
          from: dates[0].toISOString(),
          to: dates[1].toISOString(),
        },
      }));
    }
  };

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <RangePicker onChange={onDatesChangeHandler} />
      </Col>
      <Col>
        <Table
          size={'small'}
          pagination={false}
          loading={isLoading}
          // @ts-ignore
          dataSource={data}
          rowKey={'id'}
          scroll={{ x: 'max-content' }}
          summary={(tableData) => {
            let total = 0;
            tableData.forEach(({ totalRegisteredTime }) => {
              total += totalRegisteredTime;
            });
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={3}>
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
        </Table>
      </Col>
    </Row>
  );
};

export default PersonalAttendanceTable;
