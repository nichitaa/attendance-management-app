import { PageHeader } from '@shared/index';
import { Col, Row, Select, Table, Tag, Typography } from 'antd';
import departmentsAPI from '@feature/api/departments-api-slice';
import { useMemo, useState } from 'react';
import { IAdminAttendanceReportFilters } from '@pages/AttendanceReport/AttendanceReportPage';
import attendanceAPI from '@feature/api/attendance-api-slice';
import { msToHours, msToTime } from '../../utils/msToTime';
import { Pie } from '@ant-design/plots';

const { Text } = Typography;
const { Option } = Select;
const { Column } = Table;

const DepartmentAttendanceReportPage = () => {
  const [departmentId, setDepartmentId] = useState<number | undefined>();

  const { data: departments, isLoading: isDepartmentsLoading } =
    departmentsAPI.useFetchAllDepartmentsQuery(undefined);

  const [queryFilters, setQueryFilters] =
    useState<IAdminAttendanceReportFilters>({});

  const { data: attendances, isLoading: isAttendancesLoading } =
    attendanceAPI.useFetchAttendanceReportByFilterQuery(queryFilters);

  const aggregatedAttendances = useMemo(() => {
    // @ts-ignore
    return attendances?.reduce((accArr, curr) => {
      const depId = queryFilters?.departmentId || curr.user.departmentId;

      console.log({
        currentDepId: curr.user.departmentId,
        depId,
        prev: accArr,
      });

      const previousRecordIndex = accArr.findIndex(
        (el) => el.departmentId === depId
      );

      if (previousRecordIndex >= 0) {
        accArr[previousRecordIndex].totalRegisteredTime +=
          curr.totalRegisteredTime;
        accArr[previousRecordIndex].attendancesRecorded += 1;
      } else {
        accArr.push({
          departmentId: curr.user.departmentId,
          departmentName: curr.user.department.name,
          totalRegisteredTime: curr.totalRegisteredTime,
          attendancesRecorded: 1,
        });
      }

      return accArr;
    }, []);
  }, [attendances]);

  const departmentChangeHandler = (depId) => {
    setQueryFilters({ departmentId: depId });
  };

  return (
    <>
      <PageHeader
        title={'Department attendance report'}
        extra={[
          <Select
            value={queryFilters?.departmentId}
            onChange={departmentChangeHandler}
            style={{ width: '100%' }}
            loading={isDepartmentsLoading}
            placeholder={'Select a department'}
            allowClear={true}
          >
            {(departments as any[])?.map((el) => (
              <Option value={el.id} key={el.id}>
                {el.name}
              </Option>
            ))}
          </Select>,
        ]}
      />
      <Row>
        <Col span={14}>
          <Table
            size={'small'}
            pagination={false}
            loading={isAttendancesLoading}
            dataSource={aggregatedAttendances}
            rowKey={'departmentId'}
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
            <Column
              title={'Department ID'}
              dataIndex={'departmentId'}
              key={'id'}
              fixed={'left'}
            />
            <Column
              title={'Name'}
              dataIndex={'departmentName'}
              key={'departmentName'}
              render={(item) => <Tag color={'cyan'}>{item}</Tag>}
            />
            <Column
              title={'Attendances recorded'}
              dataIndex={'attendancesRecorded'}
              key={'attendancesRecorded'}
            />
            <Column
              title={'Total registered time'}
              dataIndex={'totalRegisteredTime'}
              key={'totalRegisteredTime'}
              render={(ms) => msToTime(ms)}
            />
          </Table>
        </Col>
        <Col span={10}>
          {aggregatedAttendances && (
            <Pie
              data={aggregatedAttendances?.map((el) => ({
                type: el.departmentName,
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

export default DepartmentAttendanceReportPage;
