import { PageHeader } from '@shared/index';
import { EnrollModal, UsersTable } from './components';
import { useState } from 'react';
import { Button, message, Space } from 'antd';
import userAPI from '@feature/api/user-api-slice';
import { random } from '../../utils/random';

const EnrollPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [registerFp, { isLoading: isRegisterFpLoading }] =
    userAPI.useRegisterFingerprintMutation();

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const registerFingerprint = async () => {
    const response = await registerFp({
      fingerprintId: random(1, 100),
      fingerprintTemplate: '123',
    });

    if ('error' in response) {
      return message.error(response['error']['data'].error, 3);
    }
    return message.success(response.data.message, 3);
  };

  return (
    <>
      <PageHeader title={'Enroll'} />
      <Space style={{ marginBottom: 16 }}>
        <Button type={'primary'} onClick={openModal}>
          Enroll new user
        </Button>
        <Button
          onClick={registerFingerprint}
          disabled={isRegisterFpLoading}
          loading={isRegisterFpLoading}
        >
          Register fingerprint
        </Button>
      </Space>
      <EnrollModal onModalClose={closeModal} isVisible={isModalVisible} />
      <UsersTable />
    </>
  );
};

export default EnrollPage;
