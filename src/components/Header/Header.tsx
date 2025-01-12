import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Button, Col, Layout, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserLogin, selectIsAuth } from '../../redux/auth-selectors';
import { logout } from '../../redux/auth-reducer';

export type MapPropsType = {};

export const Header: React.FC<MapPropsType> = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserLogin);

  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  const menuItems = [
    {
      key: '1',
      label: <Link to="/developers">Developers</Link>,
    },
  ];

  return (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={menuItems} />
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar alt={login || ''} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Col>
            <Col span={5}>
              <Button onClick={logoutCallback}>Log out</Button>
            </Col>
          </>
        ) : (
          <Col span={6}>
            <Button>
              <Link to="/login">Login</Link>
            </Button>
          </Col>
        )}
      </Row>
    </Header>
  );
};


    /*  <header className={s.header}>
          <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

          <div className={s.loginBlock}>
              { props.isAuth
                  ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div>
                  : <NavLink to={'/login'}>Login</NavLink> }
          </div>
      </header>*/

