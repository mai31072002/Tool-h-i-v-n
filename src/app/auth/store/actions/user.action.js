// Điều hướng đến src/app/auth/store/actions/user.action.js
import history from "@history";
// Import thư viện lodash : thư viện hỗ trợ xử lý dữ liệu, ở đây dùng để hợp nhất merge dữ liệu người dùng
import _ from "lodash";
// Import service xử lý jwt (json web token : Xử lý xác thực như tự động đăng nhập hoặc đăng xuất)
import jwtService from "app/services/jwt";

// Định nghĩa hằng số action cho user
export const SET_USER_DATA = "[USER] SET DATA"; // thiết lập dữ liệu người dùng
export const REMOVE_USER_DATA = "[USER] REMOVE DATA"; // Xóa dữ liệu người dùng
export const USER_LOGGED_OUT = "[USER] LOGGED OUT"; // trạng thái người dùng đăng xuẩt

/**
 * Set User Data
 */
// 
export function setUserData(user) {
  // dispatch action SET_USER_DATA với dữ liệu người dùng (lưu vào redux store)
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      payload: {
        data: user.data,
        role: [user.role],
      },
    });
  };
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
  return (dispatch, getState) => {
    // Lấy thông tin người dùng từ redux store
    const oldUser = getState().auth.user;
    // Hợp nhất thông tin cũ và mới của người dùng
    const user = _.merge({}, oldUser, { data: { settings } });

    // Cập nhật thông tin người dùng lên server
    updateUserData(user, dispatch);

    // dispatch action setUserData với thông tin người dùng mới (lưu vào redux store)
    return dispatch(setUserData(user));
  };
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
  return (dispatch, getState) => {
    // Lấy thông tin người dùng từ redux store
    const { user } = getState().auth;
    // Hợp nhất thông tin cũ và mới của người dùng
    const newUser = {
      ...user,
      data: {
        ...user.data,
        shortcuts,
      },
    };

    // Cập nhật thông tin người dùng lên server
    updateUserData(newUser, dispatch);

    // dispatch action setUserData với thông tin người dùng mới (lưu vào redux store)
    return dispatch(setUserData(newUser));
  };
}

/**
 * Remove User Data
 */
export function removeUserData() {
  // dispatch action REMOVE_USER_DATA (xóa thông tin người dùng khỏi redux store)
  return {
    type: REMOVE_USER_DATA,
  };
}

/**
 * Logout
 */
export function logoutUser() {
  return (dispatch, getState) => {
    // Lấy thông tin người dùng từ redux store
    const { user } = getState().auth;

    // Nếu người dùng không có role hoặc role rỗng
    if (!user.role || user.role.length === 0) {
      // is guest
      return null;
    }

    // Điều hướng đến trang chủ
    history.push({
      pathname: "/",
    });

    // Gọi hàm logout của jwtService để đăng xuất
    jwtService.logout();

    // dispatch action USER_LOGGED_OUT (trạng thái người dùng đăng xuất)
    return dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

/**
 * Update User Data
 */
// eslint-disable-next-line no-unused-vars
// Hàm cập nhật thông tin người dùng lên server
function updateUserData(user, dispatch) {
  // Nếu người dùng không có role hoặc role (vai trò) rỗng thì kết thúc
  if (!user.role || user.role.length === 0) {
    return;
  }

  jwtService
    .updateUserData(user)
    .then(() => {})
    .catch(() => {});
}
