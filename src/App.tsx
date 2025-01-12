import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import {
  BrowserRouter,
  Link,
  Route,
  Redirect,
  withRouter,
  Switch,
} from "react-router-dom";
import { LoginPage } from "./components/Login/LoginPage";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
import { UsersPage } from "./components/Users/UsersContainer";

import { Breadcrumb, Layout, Menu } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Header } from "./components/Header/Header";

// interface WithRouterProps {yarn add --dev @types/react-router-dom@5.1.7
//   navigate: ReturnType<typeof useNavigate>;
//   location: ReturnType<typeof useLocation>;
//   params: ReturnType<typeof useParams>;
// }

// export const withRouter = <P extends object>(Component: React.ComponentType<P>) => {
//   return (props: P) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const params = useParams();

//     return (
//       <Component
//         {...props}
//         navigate={navigate}
//         location={location}
//         params={params}
//       />
//     );
//   };
// };


const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);
const ChatPage = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);
const SuspendedChatPage = withSuspense(ChatPage);

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    const menuItems = [
        {
          key: "sub1",
          icon: <UserOutlined />,
          label: "My Profile",
          children: [
            { key: "1", label: <Link to="/profile">Profile</Link> },
            { key: "2", label: <Link to="/dialogs">Messages</Link> },
            { key: "3", label: "Option 3" },
            { key: "4", label: "Option 4" },
          ],
        },
        {
          key: "sub2",
          icon: <LaptopOutlined />,
          label: "Developers",
          children: [
            { key: "5", label: <Link to="/developers">Developers</Link> },
            { key: "6", label: "Option 6" },
            { key: "7", label: "Option 7" },
            { key: "8", label: "Option 8" },
          ],
        },
        {
          key: "sub3",
          icon: <NotificationOutlined />,
          label: "Subnav 3",
          children: [
            { key: "9", label: <Link to="/chat">Chat</Link> },
            { key: "10", label: "Option 10" },
            { key: "11", label: "Option 11" },
            { key: "12", label: "Option 12" },
          ],
        },
      ];
    return (
      <Layout>
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                style={{ height: "100%" }}
                items={menuItems}
              />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/profile" />}
                />

                <Route path="/dialogs" render={() => <SuspendedDialogs />} />

                <Route
                  path="/profile/:userId?"
                  render={() => <SuspendedProfile />}
                />

                <Route
                  path="/developers"
                  render={() => <UsersPage pageTitle="Самураи" />}
                />

                <Route path="/login" render={() => <LoginPage />} />

                <Route path="/chat" render={() => <SuspendedChatPage />} />

                <Route path="*" render={() => <div>404 NOT FOUND</div>} />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Samurai Social Network ©2020 Created by IT-KAMASUTRA
        </Footer>
      </Layout>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJSApp;
