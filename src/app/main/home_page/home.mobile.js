import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import withReducer from "../../store/with_reducer";
import reducer from "../../auth/store/reducers/auth.reducer";
import "./index.scss";
import * as Actions from "../../auth/store/actions/auth.action";
import axios from "axios";
// import apiConfig from "../../configs/api.config"

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSelector((state) => state.login);

  useEffect(() => {
    if (login?.data !== null) {
      if (login?.status === 200) {
        openNotificationWithIcon("success");
        // localStorage.setItem(apiConfig.accessTokenKey,login?.data?.data?.accessToken);
        // localStorage.setItem("refreshToken",login?.data?.data?.refreshToken);
        history.push("/forecast");
      } else {
        openNotificationWithIcon("error");
      }
    }
    delete axios.defaults.headers.common.Authorization;
  }, [login, dispatch, history]);
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
  return (
    <Row className={"container-content-home"}>
      <Col span={24}>
        <Row className={"cover-content"}>
          <Col span={24} className={"title-home"}>
            <span>Đăng nhập</span>
          </Col>
          <Col span={24} className={"content-detail"}>
            <Form onFinish={onSubmit} className={"form-login-tool"}>
              <Form.Item
                className={"form-input-username"}
                name={"userName"}
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
              >
                <Input
                  className={"input-form-login"}
                  placeholder={"Tên đăng nhập"}
                  value={username}
                  onChange={(e) => setUsername(e)}
                ></Input>
              </Form.Item>
              <Form.Item
                className={"form-input-password"}
                name={"password"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                ]}
              >
                <Input.Password
                  className={"input-form-login"}
                  placeholder={"Mật khẩu"}
                  value={password}
                  onChange={(e) => setPassword(e)}
                ></Input.Password>
              </Form.Item>
              <Form.Item className={"form-button-login"}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  className={"button-submit-login"}
                >
                  <span>Đăng nhập</span>
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default withReducer("login", reducer)(Home);
