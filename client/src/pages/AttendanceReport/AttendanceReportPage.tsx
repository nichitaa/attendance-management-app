import { useState } from 'react';
import attendanceAPI from '@feature/api/attendance-api-slice';
import { Button, Col, DatePicker, Form, Row, Select } from 'antd';
import { PageHeader } from '@shared/index';
import userAPI from '@feature/api/user-api-slice';
import departmentsAPI from '@feature/api/departments-api-slice';
import AttendanceReportTable from '@shared/AttendanceReportTable/AttendanceReportTable';

const { Option } = Select;
const { RangePicker } = DatePicker;

export interface IAdminAttendanceReportFilters {
  departmentId?: number;
  userId?: number;
  from?: string;
  to?: string;
}

const AttendanceReportPage = () => {
  const [form] = Form.useForm();

  const [queryFilters, setQueryFilters] =
    useState<IAdminAttendanceReportFilters>({});

  const { data: users, isLoading: isUsersLoading } =
    userAPI.useFetchAllUsersQuery(undefined);

  const { data: departments, isLoading: isDepartmentsLoading } =
    departmentsAPI.useFetchAllDepartmentsQuery(undefined);

  const { data: attendances, isLoading: isAttendancesLoading } =
    attendanceAPI.useFetchAttendanceReportByFilterQuery(queryFilters);

  const onFinish = async (values) => {
    console.log({ values });
    setQueryFilters((prev) => ({
      ...prev,
      userId: values.userId,
      departmentId: values.departmentId,
      from: values.dateRange?.[0].toISOString(),
      to: values.dateRange?.[1].toISOString(),
    }));
  };

  return (
    <>
      <PageHeader
        title={'Admin attendance report'}
        extra={[
          <Form form={form} onFinish={onFinish}>
            <Row gutter={[8, 8]}>
              <Col>
                <Form.Item name={'departmentId'} style={{ marginBottom: 0 }}>
                  <Select
                    loading={isDepartmentsLoading}
                    placeholder={'Select a department'}
                    allowClear={true}
                  >
                    {(departments as any[])?.map((el) => (
                      <Option value={el.id} key={el.id}>
                        {el.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name={'userId'} style={{ marginBottom: 0 }}>
                  <Select
                    loading={isUsersLoading}
                    placeholder={'Select a user'}
                    allowClear={true}
                  >
                    {(users as any[])?.map((el) => (
                      <Option value={el.id} key={el.id}>
                        {el.email} | {el.firstName} - {el.lastName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item name={'dateRange'} style={{ marginBottom: 0 }}>
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button block={true} type={'primary'} htmlType={'submit'}>
                    Generate
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>,
        ]}
      />
      {/*<Divider />*/}
      <AttendanceReportTable
        isAdminReport={true}
        loading={isAttendancesLoading}
        // @ts-ignore
        dataSource={attendances}
      />
    </>
  );
};

export default AttendanceReportPage;
