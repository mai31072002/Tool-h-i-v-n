// import React, { useEffect } from "react";
// import { Col, Row, notification, Spin } from "antd";
// import "./index.scss";
// import { useDispatch, useSelector } from "react-redux";
// import withReducer from "app/store/with_reducer";
// import reducer from "./store/reducers";
// import { useHistory } from "react-router-dom";
// import * as RegisterActions from "./store/actions";
// // import AuthService from "app/auth-keycloak/authservice";
// import constants from "app/helpers/constants";
// import backgroundDark from "../../../assets/icon/background-register.png";
// import { LoadingOutlined } from "@ant-design/icons";
// import apiConfig from "app/configs/api.config";
//
// const AutoLoginPage = () => {
//   const history = useHistory();
//   // const location = useLocation();
//   const dispatch = useDispatch();
//   const primaryThemes = localStorage.getItem("primaryThemes");
//
//   const antIcon = <LoadingOutlined style={{ fontSize: 58 }} spin />;
//
//   const { autoLogin } = useSelector((state) => state.registerData.register);
//
//   useEffect(() => {
//     const url = window.location.href;
//     const urlConvert = new URL(url);
//     dispatch(
//       RegisterActions.autoLogin({
//         userName: urlConvert.searchParams.get("userName"),
//         password: urlConvert.searchParams.get("password"),
//       })
//     );
//   }, [dispatch]);
//
//   useEffect(() => {
//     if (autoLogin.status !== null) {
//       if (autoLogin.status.status === 200) {
//         openNotificationWithIcon("success");
//         if (
//           autoLogin.status.data.accessToken !== null &&
//           autoLogin.status.data.refreshToken !== null
//         ) {
//           localStorage.setItem("primaryThemes", 0);
//           // AuthService.setTokens({
//           //   accessToken: autoLogin.status.data.accessToken,
//           //   refreshToken: autoLogin.status.data.refreshToken,
//           // });
//         }
//         // history.push("/dashboards");
//         window.location = apiConfig.domainHome + "/nowcast";
//       } else {
//         openNotificationWithIcon("error");
//       }
//     }
//   }, [dispatch, autoLogin, history]);
//
//   const openNotificationWithIcon = (type) => {
//     switch (type) {
//       case "success":
//         return notification[type]({
//           message: "Đăng nhập thành công",
//         });
//       case "error":
//         return notification[type]({
//           message: "Không thể đăng nhập",
//           description: "Vui lòng kiểm tra lại thông tin của tài khoản.",
//         });
//       default:
//         return type;
//     }
//   };
//
//   return (
//     <Row
//       className="main-container-register"
//       style={{
//         backgroundImage:
//           primaryThemes !== constants.PRIMARY_THEMES
//             ? ""
//             : `url(${backgroundDark})`,
//       }}
//     >
//       <Col
//         span={24}
//         className="form-register-page"
//         style={{
//           background:
//             primaryThemes !== constants.PRIMARY_THEMES
//               ? "#FFFFFF"
//               : "rgba(0, 0, 0, 0.819)",
//         }}
//       >
//         <Spin
//           tip="Loading..."
//           indicator={antIcon}
//           style={{
//             position: "absolute",
//             top: "30%",
//             left: "45%",
//           }}
//         />
//       </Col>
//     </Row>
//   );
// };
// export default withReducer("registerData", reducer)(AutoLoginPage);
