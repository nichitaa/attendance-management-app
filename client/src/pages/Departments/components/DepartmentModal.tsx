import { FC } from 'react';
import { Button, Form, Input, message, Modal, Row } from 'antd';
import departmentsAPI from '@feature/api/departments-api-slice';

interface MainProps {
  department?: any;
  isVisible: boolean;

  onModalClose(): void;
}

const DepartmentModal: FC<MainProps> = ({
  isVisible,
  department,
  onModalClose,
}) => {
  const [form] = Form.useForm();
  const [create, { isLoading: isCreateLoading }] =
    departmentsAPI.useCreateMutation();

  const [update, { isLoading: isUpdateLoading }] =
    departmentsAPI.useUpdateMutation();

  const onFinish = async (values) => {
    let response;
    if (department) {
      // update
      response = await update({
        name: values.name,
        id: department.id,
      });
    } else {
      // create
      response = await create({
        name: values.name,
      });
    }
    if ('error' in response) {
      return message.error(response['error']['data'].error, 3);
    }
    onModalClose();
    return message.success(response.data.message, 3);
  };

  return (
    <>
      <Modal
        title={'department'}
        width={500}
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
          initialValues={department ? { ...department } : undefined}
        >
          {department && (
            <Form.Item label={'ID'} name={'id'}>
              <Input disabled={true} placeholder={'ID'} />
            </Form.Item>
          )}

          <Form.Item
            label={'Name'}
            name={'name'}
            rules={[{ required: true, message: 'Department Name is required' }]}
          >
            <Input placeholder={'Department Name'} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Row justify={'end'}>
              <Button
                type={'primary'}
                htmlType={'submit'}
                loading={isCreateLoading || isUpdateLoading}
              >
                Save
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DepartmentModal;
