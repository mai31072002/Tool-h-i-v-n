import React from "react";
import PropTypes from "prop-types";
import routes from "app/configs/routes.config";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./index.scss";
// import "../main/location/components/index.scss";
import { ConfigProvider, Layout, Col, Row } from "antd";
import { Route, Switch } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Logo from "../../assets/img/icon_new/logo_dark.png";
// import LogoLight from "../../assets/img/icon_new/logo_light.png";
import apiConfig from "app/configs/api.config";
// import background from "../../assets/icon/background-register.svg"
import constants from "../helpers/constants";
const { Content } = Layout;
const Pages = () => {
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
  const primaryThemes = localStorage.getItem("primaryThemes");
  return (
    <ConfigProvider>
      {!isMobile ? (
        <Row
          className="main-header"
          style={{
            background:
              primaryThemes !== constants.PRIMARY_THEMES
                ? "#4C449B"
                : "#2c3034",
          }}
        >
          <Col span={8}>
            <Row justify={"start"}>
              <Col>
                <a href={apiConfig.domainHome}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      width: "160px",
                      paddingTop: "14px",
                      paddingLeft: "33px",
                      paddingBottom: "23px",
                    }}
                  />
                </a>
              </Col>
            </Row>
          </Col>
          <Col span={8} offset={8}></Col>
        </Row>
      ) : (
        <Row
          className="main-header"
          style={{
            background:
              primaryThemes !== constants.PRIMARY_THEMES
                ? "#4C449B"
                : "#2c3034",
          }}
        >
          <Col span={8}>
            <Row justify={"start"}>
              <Col>
                <a href={apiConfig.domainHome}>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{
                      width: "150px",
                      paddingTop: "20px",
                      paddingLeft: "33px",
                      paddingBottom: "23px",
                    }}
                  />
                </a>
              </Col>
            </Row>
          </Col>
          <Col span={8} offset={8}></Col>
        </Row>
      )}
      <Layout
        className={
          isMobile ? "main-layout-register block" : "main-layout-register"
        }
        style={{
          clear: "both",
        }}
      >
        <Layout className="site-layout-register">
          <Content
            className={isMobile ? "" : "main-content-register"}
            style={{
              background:
                primaryThemes !== constants.PRIMARY_THEMES
                  ? "#FFFFFF"
                  : "url('background-register.png')",
            }}
          >
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
};

Pages.propTypes = {
  children: PropTypes.element,
};

export default Pages;
