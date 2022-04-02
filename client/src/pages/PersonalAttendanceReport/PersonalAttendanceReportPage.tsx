import { PageHeader } from '@shared/index';
import { useAppSelector } from '@hooks/rtk-hooks';
import { useState } from 'react';
import attendanceAPI from '@feature/api/attendance-api-slice';
import { Col, DatePicker, Row } from 'antd';
import AttendanceReportTable from '@shared/AttendanceReportTable/AttendanceReportTable';
import { Pie } from '@ant-design/plots';
import moment from 'moment';
import { msToHours } from '../../utils/msToTime';

const { RangePicker } = DatePicker;

interface IReportFilters {
  id: number;
  filters: {
    from?: string;
    to?: string;
  };
}

const PersonalAttendanceReportPage = () => {
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
    <>
      <PageHeader
        title={'Personal attendance report'}
        extra={[
          <RangePicker key={'range-picker'} onChange={onDatesChangeHandler} />,
        ]}
      />
      <Row>
        <Col span={14}>
          <AttendanceReportTable
            loading={isLoading}
            // @ts-ignore
            dataSource={data}
          />
        </Col>
        <Col span={10}>
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
    </>
  );
};

export default PersonalAttendanceReportPage;
