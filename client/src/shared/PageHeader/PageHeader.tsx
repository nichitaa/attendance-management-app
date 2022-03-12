import { PageHeader } from 'antd';
import './page-header.less';
import { FC } from 'react';

interface MainProps {
  title: string;
  subTitle?: string;
}

const CustomPageHeader: FC<MainProps> = ({ title, subTitle }) => {
  return <PageHeader title={title} subTitle={subTitle} />;
};

export default CustomPageHeader;
