import { FC, useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './sider.less';
import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  HomeOutlined,
  IdcardOutlined,
  LoginOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useAppDispatch, useAppSelector } from '@hooks/rtk-hooks';
import { clearUserState } from '@feature/authorization/authorization-slice';

const { Sider } = Layout;

interface MainProps {
  collapsed: boolean;

  onCollapse(bool: boolean): void;
}

const AppSider: FC<MainProps> = ({ onCollapse, collapsed }) => {
  const { switcher, themes, currentTheme } = useThemeSwitcher();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [selectedMenuKey, setSelectedMenuKey] = useState('');
  const { isAuthorized, role, userId } = useAppSelector((s) => s.authorization);

  useEffect(() => {
    const key = location.pathname.split('/')[1]; // ['', 'main_route_name', '1']
    setSelectedMenuKey(key);
  }, [location]);

  const handleThemeChange = () => {
    switcher({ theme: currentTheme === 'light' ? themes.dark : themes.light });
  };

  const logout = () => {
    dispatch(clearUserState());
  };

  return (
    <Sider
      onCollapse={onCollapse}
      collapsed={collapsed}
      collapsible={true}
      className={'app-sider'}
    >
      <Menu mode={'inline'} selectedKeys={[selectedMenuKey]}>
        {!isAuthorized && (
          <Menu.Item
            key={'home'}
            onClick={() => navigate('/home')}
            icon={<HomeOutlined />}
          >
            Home
          </Menu.Item>
        )}

        {isAuthorized && (
          <Menu.Item
            key={'dashboard'}
            onClick={() => navigate('/dashboard')}
            icon={<HomeOutlined />}
          >
            Dashboard
          </Menu.Item>
        )}

        {isAuthorized && role === 'admin' && (
          <Menu.Item
            key={'departments'}
            onClick={() => navigate('/departments')}
            icon={<AppstoreAddOutlined />}
          >
            Departments
          </Menu.Item>
        )}

        {isAuthorized && role === 'admin' && (
          <Menu.Item
            key={'enroll'}
            onClick={() => navigate('/enroll')}
            icon={<IdcardOutlined />}
          >
            Enroll
          </Menu.Item>
        )}

        {isAuthorized && role === 'default' && (
          <Menu.Item
            key={'attendance'}
            onClick={() => navigate(`/attendance/${userId}`)}
            icon={<IdcardOutlined />}
          >
            Personal attendance report
          </Menu.Item>
        )}

        {isAuthorized && role === 'admin' && (
          <>
            <Menu.Item
              key={'attendance'}
              onClick={() => navigate(`/attendance`)}
              icon={<IdcardOutlined />}
            >
              General Attendance report
            </Menu.Item>
            <Menu.Item
              key={'department-attendance'}
              onClick={() => navigate(`/department-attendance`)}
              icon={<IdcardOutlined />}
            >
              Departments attendance report
            </Menu.Item>
          </>
        )}

        {!isAuthorized && (
          <Menu.Item
            key={'login'}
            onClick={() => navigate('/login')}
            icon={<LoginOutlined />}
          >
            Login
          </Menu.Item>
        )}

        {isAuthorized && (
          <Menu.Item key={'login'} onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        )}

        <Menu.Item
          key={'theme-toggle'}
          icon={<BgColorsOutlined />}
          onClick={handleThemeChange}
        >
          {currentTheme === 'light' ? 'Dark Theme' : 'Light Theme'}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSider;
