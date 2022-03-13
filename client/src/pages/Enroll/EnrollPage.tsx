import { PageHeader } from '@shared/index';
import { EnrollModal, UsersTable } from './components';
import { useState } from 'react';
import { Button, Space } from 'antd';

const EnrollPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <>
      <PageHeader title={'Enroll'} />
      <Space style={{ marginBottom: 16 }}>
        <Button type={'primary'} onClick={openModal}>
          Enroll new user
        </Button>
      </Space>
      <EnrollModal onModalClose={closeModal} isVisible={isModalVisible} />
      <UsersTable />
    </>
  );
};

export default EnrollPage;
