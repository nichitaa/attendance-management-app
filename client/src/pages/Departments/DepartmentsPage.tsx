import { DepartmentsTable } from './components';
import { PageHeader } from '@shared/index';
import { useState } from 'react';
import { Button } from 'antd';
import DepartmentModal from './components/DepartmentModal';

const DepartmentsPage = () => {
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(undefined);

  const openCreateModal = () => setIsCreateModalVisible(true);
  const closeCreateModal = () => setIsCreateModalVisible(false);

  const openUpdateModal = (record) => {
    setRecordToUpdate(record);
    setIsUpdateModalVisible(true);
  };

  const closeUpdateModal = () => {
    setRecordToUpdate(undefined);
    setIsUpdateModalVisible(false);
  };

  return (
    <>
      <PageHeader
        title={'Departments'}
        extra={[
          <Button type={'primary'} onClick={openCreateModal}>
            New department
          </Button>,
        ]}
      />
      <DepartmentsTable openUpdateRecordModal={openUpdateModal} />
      <DepartmentModal
        isVisible={isCreateModalVisible}
        onModalClose={closeCreateModal}
      />
      <DepartmentModal
        isVisible={isUpdateModalVisible}
        onModalClose={closeUpdateModal}
        department={recordToUpdate}
      />
    </>
  );
};

export default DepartmentsPage;
