import { Divider, PageHeader, Typography } from 'antd';
import './page-header.less';
import { FC, ReactNode } from 'react';

interface MainProps {
  title: string;
  subTitle?: string;
  extra?: ReactNode;
}

const CustomPageHeader: FC<MainProps> = ({ title, subTitle, extra }) => {
  return (
    <>
      <PageHeader
        title={
          <>
            <Typography.Title
              level={2}
              style={{ textAlign: 'center', marginBottom: 0 }}
            >
              <Typography.Text code={true}>{title}</Typography.Text>
            </Typography.Title>
          </>
        }
        extra={extra}
        subTitle={subTitle}
        style={{ paddingBottom: 5 }}
      />
      <Divider style={{ marginTop: 5 }} />
    </>
  );
};

export default CustomPageHeader;
