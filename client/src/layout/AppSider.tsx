import { FC, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './sider.less';
import { HomeOutlined, BgColorsOutlined } from '@ant-design/icons';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const { Sider } = Layout;

interface MainProps {
  collapsed: boolean;

  onCollapse(bool: boolean): void,
}

const AppSider: FC<MainProps> = ({ onCollapse, collapsed }) => {

  const { switcher, themes, currentTheme } = useThemeSwitcher();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMenuKey, setSelectedMenuKey] = useState('');

  useEffect(() => {
    const key = location.pathname.split('/')[1]; // ['', 'main_route_name', '1']
    setSelectedMenuKey(key);
  }, [location]);

  const handleThemeChange = () => {
    switcher({ theme: currentTheme === 'light' ? themes.dark : themes.light });
  };

  return (
    <Sider onCollapse={onCollapse} collapsed={collapsed} collapsible={true} className={'app-sider'}>
      <Menu mode={'inline'} selectedKeys={[selectedMenuKey]}>
        <Menu.Item key={'home'} onClick={() => navigate('/home')} icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key={'theme-toggle'} icon={<BgColorsOutlined />} onClick={handleThemeChange}>
          {currentTheme === 'light' ? 'Dark Theme' : 'Light Theme'}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSider;