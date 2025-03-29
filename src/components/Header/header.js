import React from "react";
import "./header.scss";
import { Row, Col, Dropdown } from "antd";
import imgLogo from "assets/img/image_header/logo_wind_capacity.png";
import iconUser from "assets/icon/header/icon_user.svg";
import iconAccount from "assets/icon/header/icon_account.svg";
import iconLock from "assets/icon/header/icon_lock.svg";
import iconSignOut from "assets/icon/header/icon_sign_out.svg";
import iconAccountActive from "assets/icon/header/icon_account_active.svg";
import { Link } from "react-router-dom";
import apiConfig from "../../app/configs/api.config";
// import {useDispatch} from "react-redux"
// import {updatePassword} from "../../app/main/account/store/actions/account.action"

const Header = React.memo(() => {
  const handleSignOut = () => {
    localStorage.removeItem(apiConfig.accessTokenKey);
    localStorage.removeItem(apiConfig.refreshTokenKey);
  };
  const items = [
    {
      key: "1",
      label: (
        <Link
          to={"/account"}
          className={
            window.location.pathname.split("/")[1] === "account"
              ? "text-detail-account-active"
              : "text-detail-account"
          }
        >
          <img
            src={
              window.location.pathname.split("/")[1] === "account"
                ? iconAccountActive
                : iconAccount
            }
            alt={"icon-account"}
            className={"header-icon-account"}
          />
          <span>Account infomation</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to={"/update-password"} className={"text-detail-account"}>
          <img
            src={iconLock}
            alt={"icon-lock"}
            className={"header-icon-lock"}
          />{" "}
          <span> Change password</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link
          to={"/"}
          className={"text-detail-account"}
          onClick={() => handleSignOut()}
        >
          <img
            src={iconSignOut}
            alt={"icon-sign-out"}
            className={"header-icon-lock"}
          />{" "}
          <span>Sign out</span>
        </Link>
      ),
    },
  ];
  const pathNameActive = window.location.pathname.split("/")[1];
  return (
    <Row className="main-header fix-header">
      <Col span={3} className={"container-logo-wind-capacity"}>
        <Row className={"cover-logo-capacity"}>
          <Col span={10} className={"container-logo-capacity"}>
            <img
              src={imgLogo}
              alt={"logo-wind-capacity"}
              className={"image-logo-capacity"}
            />
          </Col>
          <Col span={14} className={"title-header"}>
            <span>Power Forecast</span>
          </Col>
        </Row>
      </Col>
      <Col span={20} className={"content-main-header"}>
        <Row className={"cover-detail-main-header"}>
          <Col span={24} className={"detail-content-main-header"}>
            <Link
              to={"/forecast"}
              className={
                pathNameActive === "forecast" ? "text-link-active" : "text-link"
              }
            >
              Forecast
            </Link>
            <Link
              to={"/forecast"}
              className={
                pathNameActive === "analyze" ? "text-link-active" : "text-link"
              }
            >
              Analyze
            </Link>
          </Col>
        </Row>
      </Col>
      <Col span={1} className={"container-account-user"}>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement={"bottom"}
          className={"dropdown-account"}
          overlayClassName={"detail-dropdown-account"}
        >
          <img
            src={iconUser}
            alt={"icon-user"}
            className={"header-icon-user"}
          />
        </Dropdown>
      </Col>
      {/*<Modal title={"Cập nhật mật khẩu"} centered={true} open={showModalUpdatePassword} onCancel={() => handleCancleUpdatePassword()} footer={false} className={"modal-update-password"}>*/}
      {/*    <Form onFinish={(values) => handleUpdatePassword(values)} form={form} className={"form-update-password"}>*/}
      {/*        <Form.Item*/}
      {/*            label={"Username"}*/}
      {/*            name={"username"}*/}
      {/*            rules={[*/}
      {/*                {*/}
      {/*                    require: true,*/}
      {/*                    message:"Vui lòng nhập tên tài khoản của bạn !!!"*/}
      {/*                }*/}
      {/*            ]}*/}
      {/*            className={"form-item-username"}*/}
      {/*        >*/}
      {/*            <Input className={"input-username"}/>*/}
      {/*        </Form.Item>*/}
      {/*        <Form.Item*/}
      {/*            label={"Password old"}*/}
      {/*            name={"passwordOld"}*/}
      {/*            rules={[*/}
      {/*                {*/}
      {/*                    required: true,*/}
      {/*                    message: "Vùi lòng nhập mật khẩu hiện tại của bạn !!!"*/}
      {/*                }*/}
      {/*            ]}*/}
      {/*            className={"form-item-password"}*/}
      {/*        >*/}
      {/*            <Input.Password className={"input-password-old"}/>*/}
      {/*        </Form.Item>*/}
      {/*        <Form.Item*/}
      {/*            label={"Password new"}*/}
      {/*            name={"passwordNew"}*/}
      {/*            rules={[*/}
      {/*                {*/}
      {/*                    required: true,*/}
      {/*                    message: "Vui lòng nhập mật khẩu mới của bạn !!!"*/}
      {/*                }*/}
      {/*            ]}*/}
      {/*            className={"form-item-password"}*/}
      {/*        >*/}
      {/*            <Input.Password className={"input-password-new"}/>*/}
      {/*        </Form.Item>*/}
      {/*        <Form.Item*/}
      {/*            name="confirm"*/}
      {/*            label={"Confirm Password"}*/}
      {/*            dependencies={['passwordNew']}*/}
      {/*            hasFeedback*/}
      {/*            rules={[*/}
      {/*                {*/}
      {/*                    required: true,*/}
      {/*                    message: "Vui lòng xác nhận lại mật khẩu bạn"*/}
      {/*                },*/}
      {/*                ({getFieldValue}) => ({*/}
      {/*                validator(_, value) {*/}
      {/*                    if (!value || getFieldValue('passwordNew') === value) {*/}
      {/*                        console.log()*/}
      {/*                        return Promise.resolve();*/}
      {/*                    }*/}
      {/*                    return Promise.reject(new Error("Mật khẩu mới của bạn không khớp với mật khẩu trước đó!!!"))*/}
      {/*                }*/}
      {/*            })*/}
      {/*            ]}*/}
      {/*            className={"form-item-confirm-password"}*/}
      {/*        >*/}
      {/*            <Input.Password className={"input-password-confirm"}/>*/}
      {/*        </Form.Item>*/}
      {/*        <Form.Item>*/}
      {/*            <Button type={"primary"} htmlType={"submit"} className={"btn-save-password"}>*/}
      {/*                Lưu*/}
      {/*            </Button>*/}
      {/*        </Form.Item>*/}
      {/*    </Form>*/}
      {/*</Modal>*/}
    </Row>
  );
});

export default Header;
