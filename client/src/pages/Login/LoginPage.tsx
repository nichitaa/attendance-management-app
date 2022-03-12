import React from 'react';
import { Button, Form, Input, message, Row, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import './login.less';
import userAPI from '@feature/api/user-api-slice';
import { setAuthorizedUser } from '@feature/authorization/authorization-slice';

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginUser] = userAPI.useLoginUserMutation();

  const onFinish = async (values) => {
    const response = await loginUser({
      email: values.email,
      password: values.password,
    });

    if ('error' in response)
      return message.error(response['error']['data'].error, 2);

    dispatch(setAuthorizedUser(response.data.data));
    return message.success(response.data.message, 3);
  };
  return (
    <>
      <Row justify={'center'} align={'middle'} style={{ height: '100%' }}>
        <Form
          className={'login-from-container'}
          labelAlign={'left'}
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          autoComplete='off'
          onFinish={onFinish}
        >
          <Form.Item wrapperCol={{ span: 24 }}>
            <Title style={{ textAlign: 'center' }} level={2}>
              Login
            </Title>
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input autoComplete={'on'} />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password autoComplete={'on'} />
          </Form.Item>
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block={true} type='primary' htmlType='submit'>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default LoginPage;
