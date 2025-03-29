import React from "react";
import PropTypes from "prop-types";
import routes from "app/configs/routes.config";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./index.scss";
import "./admin.scss";
import { ConfigProvider, Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import Header from "components/Header/header.js";
import { isMobileOnly } from "react-device-detect";
const { Content } = Layout;

function Dashboard() {
  const loading = (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading...
    </div>
  );

  return (
    <ConfigProvider>
      <Header />
      <Layout
        className={isMobileOnly ? "main-layout block" : "main-layout"}
        style={{ clear: "both" }}
      >
        <React.Suspense fallback={loading}></React.Suspense>

        <Layout className="site-layout">
          <Content className={isMobileOnly ? "" : "main-content"}>
            <React.Suspense fallback={loading}>
              <Switch>
                {routes.map((route, idx) =>
                  route.component ? (
                    <Route
                      key={String(idx)}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(renderProps) => (
                        <route.component {...renderProps} />
                      )}
                    />
                  ) : null
                )}
              </Switch>
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

Dashboard.propTypes = {
  children: PropTypes.element,
};

export default Dashboard;
