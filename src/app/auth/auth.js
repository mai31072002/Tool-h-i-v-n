// Desc: Auth component kiểm tra trạng thái người dùng, nếu người dùng đã đăng nhập thì hiển thị trang chính, ngược lại hiển thị trang login.
import React, { Component } from "react";
// Kết nối với store
import { connect } from "react-redux";
// Liên kết các action với dispatch
import { bindActionCreators } from "redux";
// Kiểm tra kiểu dữ liệu
import PropTypes from "prop-types";

// Import các action
import * as userActions from "app/auth/store/actions";
// Import service xử lý jwt (json web token : Xử lý xác thực như tự động đăng nhập hoặc đăng xuất)
import jwtService from "app/services/jwt";

// Component hiển thị khi ứng dụng đang tải 
function SplashScreen() {
  return (
    <div className="pageloader">
      <span className="title">Loading...</span>
    </div>
  );
}

class Auth extends Component {
  // Khởi tạo state
  // waitAuthCheck: true: biến trang thái chờ kiểm tra xác thực, mặc định là true
  state = {
    waitAuthCheck: true,
  };

  // Khi conponent đc mount
  componentDidMount() {
    // Gọi hàm jwtCheck kiểm tra xác thực
    return Promise.all([
      // TODO: gọi hàm jwtCheck để kiểm tra trạng thái xác thực -> Đến jwt.js
      this.jwtCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false }); // cập nhật trạng thái khi kiểm tra xong
    });
  }

  // Hàm kiểm tra jwt
  jwtCheck = () =>
    new Promise((resolve) => {
      // Lắng nghe sự kiện onAutoLogin 
      jwtService.on("onAutoLogin", () => {
        jwtService
        // Gọi hàm signInWithRefreshToken để đăng nhập với token mới
          .signInWithRefreshToken()
          .then((user) => {
            // Nếu đăng nhập thành công thì cập nhật thông tin người dùng (lưu vào redux store)
            this.props.setUserData({
              data: user.data,
              role: [user.role],
            });
            resolve();
          })
          .catch(() => {
            resolve();
          });
      });

      // Lắng nghe sự kiện onAutoLogout
      jwtService.on("onAutoLogout", (message) => {
        // Nếu có thông báo thì hiển thị thông báo
        if (message) {
          // this.props.showMessage({ message });
          console.log(message);
        }

        // Khi đăng xuất thì xóa thông tin người dùng khỏi redux store
        this.props.logout();

        resolve();
      });

      // Lắng nghe sự kiện onNoAccessToken -> Khi không có token thì resolve (kết thúc)
      jwtService.on("onNoAccessToken", () => {
        resolve();
      });

      // Khởi tạo dịch vụ
      jwtService.init();

      // Nếu không có token thì resolve (kết thúc)
      return Promise.resolve();
    });

  render() {
    // Nếu waitAuthCheck là true thì hiển thị SplashScreen
    return this.state.waitAuthCheck ? (
      <SplashScreen />
    ) : (
      // Ngược lại thì hiển thị children (trang chính)
      <>{this.props.children}</>
    );
  }
}

// Kết nối action với redux store (logoutUser, setUserData từ userActions)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
    },
    dispatch
  );
}

// Kiểm tra kiểu dữ liệu
Auth.propTypes = {
  logout: PropTypes.func,
  setUserData: PropTypes.func,
  children: PropTypes.element,
};

export default connect(null, mapDispatchToProps)(Auth);

/**
 * Khi ứng dụng khởi động, Auth kiểm tra trạng thái xác thực thông qua jwtCheck.
 * Nếu người dùng đã đăng nhập, lưu thông tin người dùng vào Redux store.
 * Nếu người dùng chưa đăng nhập hoặc bị đăng xuất, hiển thị giao diện phù hợp.
 */
