import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";


const menuItems = [
  {
    key: 'sub1',
    icon: <UserOutlined />,
    title: 'My Profile',
    children: [
      { key: '1', label: <Link to="/profile">Profile</Link> },
      { key: '2', label: <Link to="/dialogs">Messages</Link> },
      { key: '3', label: 'option3' },
      { key: '4', label: 'option4' },
    ],
  },
  {
    key: 'sub2',
    icon: <LaptopOutlined />,
    title: 'Developers',
    children: [
      { key: '5', label: <Link to="/developers">Developers</Link> },
      { key: '6', label: 'option6' },
      { key: '7', label: 'option7' },
      { key: '8', label: 'option8' },
    ],
  },
  {
    key: 'sub3',
    icon: <NotificationOutlined />,
    title: 'subnav 3',
    children: [
      { key: '9', label: <Link to="/chat">Chat</Link> },
      { key: '10', label: 'option10' },
      { key: '11', label: 'option11' },
      { key: '12', label: 'option12' },
    ],
  },
];

const MenuComponent = () => {
  return (
    <Menu mode="inline" style={{ height: "100%" }} items={menuItems} />
  );
};

export default MenuComponent;
