import { Layout } from 'antd';
import AppSider from './AppSider';
import { FC, useState } from 'react';

const AppLayout: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider={true}>
      <AppSider
        collapsed={collapsed}
        onCollapse={(bool) => setCollapsed(bool)}
      />
      <Layout
        className='site-layout'
        style={{ marginLeft: collapsed ? 83 : 200, transition: 'all 0.3s' }}
      >
        <Layout.Content style={{ overflow: 'initial' }}>
          <div
            className='site-layout-background'
            style={{ padding: 24, minHeight: '90vh' }}
          >
            {props.children}
          </div>
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          ©2022 Attendance Management System
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;