import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, notification, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import withReducer from "../../store/with_reducer";
import reducer from "../../auth/store/reducers/auth.reducer";
import "./index.scss";
import * as Actions from "../../auth/store/actions/auth.action";
import axios from "axios";
import { Link } from "react-router-dom";
import imgDashboard1 from "assets/img/image_login/dashboard1.png";
import imgDashboard2 from "assets/img/image_login/dashboard2.png";
import imgDashboard3 from "assets/img/image_login/dashboard3.png";
import imgTurbine1 from "assets/img/image_login/wind-turbine1.png";
import imgTurbine2 from "assets/img/image_login/wind-turbine2.png";
import imgTurbine3 from "assets/img/image_login/wind-turbine3.png";
import apiConfig from "../../configs/api.config";
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSelector((state) => state.login);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Kiểm tra nếu có thông tin đăng nhập đã được lưu
    const rememberedUser = localStorage.getItem(apiConfig.rememberUsername);
    if (rememberedUser) {
      setUsername(localStorage.getItem(apiConfig.rememberUsername));
      setPassword(localStorage.getItem(apiConfig.rememberPassword));
      setRememberMe(true);
    }
  }, [rememberMe]);

  useEffect(() => {
    if (login?.data !== null) {
      if (login?.status === 200) {
        openNotificationWithIcon("success");
        history.push("/forecast");
      } else {
        openNotificationWithIcon("error");
      }
    }
    delete axios.defaults.headers.common.Authorization;
  }, [login, dispatch, history]);

  useEffect(() => {
    if (login?.data !== null) {
      if (login?.status === 200) {
        if (rememberMe) {
          localStorage.setItem(apiConfig.rememberUsername, username);
          localStorage.setItem(apiConfig.rememberPassword, password);
        } else {
          localStorage.removeItem(apiConfig.rememberUsername);
          localStorage.removeItem(apiConfig.rememberPassword);
        }
      }
    }
  }, [login, rememberMe, username, password]);
  const onSubmit = (e) => {
    dispatch(Actions.submitLogin(e));
  };

  const openNotificationWithIcon = (type) => {
    switch (type) {
      case "success":
        return notification[type]({
          message: "Đăng nhập thành công !!!",
        });
      case "error":
        return notification[type]({
          message: "Đăng nhập không thành công !!!",
          description:
            "Vui lòng kiểm tra lại thông tin của tài khoản mà bạn vừa nhập .",
        });
      default:
        return type;
    }
  };
  console.log("remember :", rememberMe);
  return (
    <Row className={"container-content-home"}>
      <Col span={9} className={"box-content-home"}>
        <Row className={"cover-content"}>
          <Col span={24} className={"title-home"}>
            <span>Sign In</span>
          </Col>
          <Col span={24} className={"note-title-home"}>
            <span>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              Don&apos;t have an account? <a>Sign Up</a>
            </span>
          </Col>
          <Col span={24} className={"content-detail"}>
            <Form
              onFinish={onSubmit}
              className={"form-login-tool"}
              layout={"vertical"}
            >
              <Form.Item
                className={"form-input-username"}
                name={"username"}
                label={"Email address"}
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input
                  className={"input-form-login"}
                  placeholder={"e.g. caixa@nicolas.com"}
                  defaultValue={username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
              </Form.Item>
              <Form.Item
                className={"form-input-password"}
                name={"password"}
                label={"Password"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                ]}
              >
                <Input.Password
                  className={"input-form-login"}
                  placeholder={"Enter your password"}
                  defaultValue={password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Input.Password>
              </Form.Item>
              <Form.Item className={"form-remember-login"}>
                <Col span={24}>
                  <Row>
                    <Col
                      span={12}
                      className={"container-checkbox-remember-login"}
                    >
                      <Checkbox
                        className={"text-remember-login"}
                        checked={rememberMe}
                        onChange={(e) => {
                          setRememberMe(e.target.checked);
                        }}
                      >
                        <span>Keep me sign in</span>
                      </Checkbox>
                    </Col>
                    <Col span={12} className={"container-forgot-password"}>
                      <Link to={""} className={"link-forgot-password"}>
                        Forgot password?
                      </Link>
                    </Col>
                  </Row>
                </Col>
              </Form.Item>
              <Form.Item className={"form-button-login"}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  className={"button-submit-login"}
                >
                  <span>Sign In</span>
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Col span={15} className={"box-content-home-right"}>
        <Row>
          <Col span={24} className={"cover-image-top"}>
            <img
              src={imgDashboard1}
              alt={"dashboard1"}
              className={"img-dashboard1"}
            />
            <img
              src={imgDashboard2}
              alt={"dashboard2"}
              className={"img-dashboard2"}
            />
          </Col>
          <Col span={24} className={"cover-image-bottom"}>
            <img
              src={imgDashboard3}
              alt={"dashboard3"}
              className={"img-dashboard3"}
            />
            <img
              src={imgTurbine1}
              alt={"turbine1"}
              className={"img-turbine1"}
            />
            <img
              src={imgTurbine2}
              alt={"turbine2"}
              className={"img-turbine2"}
            />
            <img
              src={imgTurbine3}
              alt={"turbine3"}
              className={"img-turbine3"}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default withReducer("login", reducer)(Home);
