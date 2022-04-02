import { Col, DatePicker, Row } from 'antd';
import { useAppSelector } from '@hooks/rtk-hooks';
import attendanceAPI from '@feature/api/attendance-api-slice';
import { Pie } from '@ant-design/plots';
import { msToHours } from '../../../utils/msToTime';
import { useState } from 'react';
import moment from 'moment';
import AttendanceReportTable from '@shared/AttendanceReportTable/AttendanceReportTable';

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
      <Col span={12}>
        <AttendanceReportTable
          loading={isLoading}
          // @ts-ignore
          dataSource={data}
        />
      </Col>
      <Col span={12}>
        {data && (
          <Pie
            data={data
              // @ts-ignore
              ?.filter((el) => el.endTime)
              ?.map((el) => ({
                type: moment(el.createdAt).startOf('day').format('LL'),
                value: msToHours(el.totalRegisteredTime),
              }))}
            appendPadding={10}
            angleField={'value'}
            colorField={'type'}
            radius={0.8}
            label={{ type: 'outer', content: '{name}', labelHeight: 40 }}
            interactions={[
              { type: 'pie-legend-active' },
              { type: 'element-active' },
            ]}
          />
        )}
      </Col>
    </Row>
  );
};

export default PersonalAttendanceTable;
