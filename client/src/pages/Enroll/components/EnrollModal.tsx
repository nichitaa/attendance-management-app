import { FC } from 'react';
import { Button, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd';
import { UserRoles } from '../../../types/enums';
import departmentsAPI from '@feature/api/departments-api-slice';
import userAPI from '@feature/api/user-api-slice';

interface MainProps {
  isVisible: boolean;

  onModalClose(): void;
}

const EnrollModal: FC<MainProps> = ({ isVisible, onModalClose }) => {
  const [form] = Form.useForm();

  const { data: departments, isLoading: isDepartmentsLoading } =
    departmentsAPI.useFetchAllDepartmentsQuery(undefined);
  const [create, { isLoading: isUserCreateLoading }] =
    userAPI.useCreateUserMutation();

  const onFinish = async (values) => {
    console.log({ values });
    const response = await create({
      ...values,
      dateOfBirth: values.dateOfBirth.toISOString(),
    });
    console.log({response});
    if ('error' in response) {
      return message.error(response['error']['data'].error, 3);
    }
    onModalClose();
    return message.success(response.data.message, 3);
  };

  return (
    <Modal
      title={'Enroll new user'}
      width={500}
      style={{ top: 20 }}
      visible={isVisible}
      footer={null}
      onCancel={onModalClose}
    >
      <Form
        form={form}
        labelAlign={'left'}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
        onFinish={onFinish}
      >
        <Form.Item
          label={'First name'}
          name={'firstName'}
          rules={[{ required: true }]}
        >
          <Input placeholder={'First name'} />
        </Form.Item>

        <Form.Item
          label={'Last name'}
          name={'lastName'}
          rules={[{ required: true }]}
        >
          <Input placeholder={'Last name'} />
        </Form.Item>

        <Form.Item
          label={'Email'}
          name={'email'}
          rules={[{ required: true }, { type: 'email' }]}
        >
          <Input placeholder={'email'} />
        </Form.Item>

        <Form.Item
          label={'Department'}
          name={'departmentId'}
          rules={[{ required: true }]}
        >
          <Select
            placeholder={'Assign user to a department'}
            loading={isDepartmentsLoading}
          >
            {departments?.map((department) => (
              <Select.Option
                key={department.id}
                value={department.id}
                children={department.name}
              />
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={'PIN'} name={'PIN'} rules={[{ required: true }]}>
          <Input placeholder={'PIN'} />
        </Form.Item>

        <Form.Item
          label={'Date of birth'}
          name={'dateOfBirth'}
          rules={[{ required: true }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            placeholder={'Select the date of birth'}
            format={'YYYY-MM-DD'}
          />
        </Form.Item>

        <Form.Item label={'role'} name={'role'} rules={[{ required: true }]}>
          <Select placeholder={'Select a user role'}>
            {Object.values(UserRoles).map((role) => (
              <Select.Option key={role} value={role} children={role} />
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={'Password'}
          name={'password'}
          rules={[{ required: true }]}
        >
          <Input.Password placeholder={'a strong password'} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Row justify={'end'}>
            <Button
              type={'primary'}
              htmlType={'submit'}
              loading={isUserCreateLoading}
              disabled={isUserCreateLoading}
            >
              Save
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EnrollModal;
