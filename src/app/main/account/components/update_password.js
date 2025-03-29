import React, { useEffect } from "react";
import { Button, Col, Form, Input, Row, notification } from "antd";
import "./style.scss";
import withReducer from "../../../store/with_reducer";
import reducer from "../../account/store/reducers";
import * as Actions from "../store/actions/account.action";
import { useSelector, useDispatch } from "react-redux";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleUpdatePassword = (data) => {
    delete data.confirm;
    dispatch(Actions.updatePassword(data));
  };
  const handleNotifiUpdatePassword = (type, message, description) => {
    switch (type) {
      case "success":
        return notification[type]({
          message: message,
          description: description,
        });
      case "error":
        return notification[type]({
          message: message,
          description: description,
        });
      default:
        return type;
    }
  };

  const { updatePassword } = useSelector(
    (state) => state.updatePassword.account
  );

  useEffect(() => {
    // console.log("status :",updatePassword.status)
    if (updatePassword?.data !== null) {
      if (updatePassword?.status === 200) {
        handleNotifiUpdatePassword(
          "success",
          "Thay đổi mật khẩu thành công",
          "Mật khẩu của bạn đã được thay đổi"
        );
        dispatch(Actions.resetUpdatePassword());
        form.resetFields();
      } else if (updatePassword?.status === 204) {
        handleNotifiUpdatePassword(
          "error",
          "Mật khẩu cũ không đúng",
          "Mật khẩu cũ của bạn không chính xác, vui lòng nhập chính xác mật khẩu cũ để cập nhật khẩu mới"
        );
        dispatch(Actions.resetUpdatePassword());
      } else {
        handleNotifiUpdatePassword(
          "error",
          "Cập nhật mật khẩu không thành công",
          "Thay đổi mật khẩu không thành công, vui lòng thử lại"
        );
        dispatch(Actions.resetUpdatePassword());
      }
    }
    // dispatch(Actions.resetUpdatePassword());
  }, [updatePassword, form, dispatch]);

  return (
    <Col span={24} className={"container-form-update-password"}>
      <Row className={"cover-form-update-password"}>
        <Form
          onFinish={handleUpdatePassword}
          form={form}
          className={"form-update-password"}
        >
          <Col span={24} className={"title-update-password"}>
            Update Password
          </Col>
          <Form.Item
            label={"Username"}
            name={"username"}
            rules={[
              {
                require: true,
                message: "Vui lòng nhập tên tài khoản của bạn !!!",
              },
            ]}
            className={"form-item-username"}
          >
            <Input className={"input-username"} />
          </Form.Item>
          <Form.Item
            label={"Password old"}
            name={"passwordOld"}
            rules={[
              {
                required: true,
                message: "Vùi lòng nhập mật khẩu hiện tại của bạn !!!",
              },
            ]}
            className={"form-item-password"}
          >
            <Input.Password className={"input-password-old"} />
          </Form.Item>
          <Form.Item
            label={"Password new"}
            name={"passwordNew"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu mới của bạn !!!",
              },
            ]}
            className={"form-item-password"}
          >
            <Input.Password className={"input-password-new"} />
          </Form.Item>
          <Form.Item
            name="confirm"
            label={"Confirm Password"}
            dependencies={["passwordNew"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận lại mật khẩu bạn",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("passwordNew") === value) {
                    console.log();
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Mật khẩu mới của bạn không khớp với mật khẩu trước đó!!!"
                    )
                  );
                },
              }),
            ]}
            className={"form-item-confirm-password"}
          >
            <Input.Password className={"input-password-confirm"} />
          </Form.Item>
          <Form.Item>
            <Button
              type={"primary"}
              htmlType={"submit"}
              className={"btn-save-password"}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Col>
  );
};

export default withReducer("updatePassword", reducer)(UpdatePassword);
