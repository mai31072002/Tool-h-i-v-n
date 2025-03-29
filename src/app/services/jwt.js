// Thư viện jwt-decode giúp giải mã token jwt, giúp lấy thông tin từ token
import jwtDecode from "jwt-decode";
// Thư viện axios giúp gửi các yêu cầu HTTP
import axios from "axios";
// Thư viện history giúp quản lý lịch sử duyệt web
import history from "@history";
// Import Utils từ thư viện helpers/utils (sử dụng để kế thừa EventEmitter <quản lý sự kiện>)
import Utils from "app/helpers/utils";
// Import cấu hình api từ file cấu hình api.config
import apiConfig from "app/configs/api.config";

axios.defaults.baseURL = apiConfig.baseURL; // baseURL: đặt URL gốc cho tất cả các yêu cầu HTTP 
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"; // Đặt header để chỉ định rằng đây là yêu cầu AJAX (đến từ XMLHttpRequest)
axios.defaults.headers.common["Accept-Language"] = "vi"; // Đặt ngôn ngữ mặc định là tiếng việt
axios.defaults.withCredentials = true; // Đặt withCredentials là true để gửi cookie với mọi yêu cầu
delete axios.defaults.headers.common.Authorization; // Xóa header Authorization mặc định

// Class JwtService kế thừa từ EventEmitter lắng nghe các sự kiện (onAutoLogin, onAutoLogout, onNoAccessToken)
class JwtService extends Utils.EventEmitter { // kế thừ từ EventEmitter ở đây giải quyết vấn đề gì ??
  // Hàm khởi tạo
  init() {
    // Lắng nghe sự kiện khi ứng dụng khởi động
    this.handleAuthentication();
  }
  // Hàm xử lý xác thực
  handleAuthentication = () => {
    // Lấy thông tin access token và refresh token từ localStorage
    const dataToken = {
      accessToken: this.getAccessToken(),
      refreshToken: this.getRefreshToken(),
    };
    // Nếu không có access token thì emit sự kiện onNoAccessToken
    if (!dataToken.accessToken) {
      this.emit("onNoAccessToken");
      return;
    }

    // Nếu có access token (isAuthTokenValid) thì kiểm tra token có hợp lệ không
    if (this.isAuthTokenValid(dataToken)) {
      // Nếu token hợp lệ thì set session và emit sự kiện onAutoLogin
      this.setSession(dataToken);
      this.emit("onAutoLogin", true);
    } else {
      // Nếu token không hợp lệ thì xóa session và emit sự kiện onAutoLogout
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  // Hàm đăng nhập với tên người dùng và mật khẩu
  createUser = (data) =>
    new Promise((resolve, reject) => {
      // Gửi yêu cầu POST đến /api/auth/register với dữ liệu người dùng
      axios.post("/api/auth/register", data).then((response) => {
        // Nếu có dữ liệu người dùng thì resolve (kết thúc) với dữ liệu người dùng
        if (response.data.user) {
          // Lưu access token và refresh token vào localStorage
          this.setSession(response.data.access_token);
          // trả về (response) dữ liệu người dùng
          resolve(response.data.user);
        } else {
          // Nếu không có dữ liệu người dùng thì reject (kết thúc) với lỗi
          reject(response.data.error);
        }
      });
    });

  // Hàm đăng nhập với tên người dùng và mật khẩu
  signInWithUsernameAndPassword = (param) =>
    // Gửi yêu cầu POST đến /api/auth/login với dữ liệu người dùng
    axios.post("/guest/token", param).then((res) => {
      // Nếu có lỗi thì reject (kết thúc) với lỗi
      if (res.data.status !== 200) return Promise.reject(res.data.message);
      // Nếu có dữ liệu người dùng thì lưu access token và refresh token vào localStorage
      this.setSession(res.data.data);
      const user = {
        data: res.data.data,
        role: "USER",
        redirectUrl: "/forecast",
      };
      return user;
    });

    // Hàm đăng nhập tự động với tên người dùng và mật khẩu
  signInWithRefreshToken = () =>
    axios
      // Gửi yêu cầu POST đến /api/auth/login với dữ liệu người dùng
      .post("/guest/refresh-token", { refreshToken: this.getRefreshToken() })
      .then((res) => {
        // Nếu có lỗi thì reject (kết thúc) với lỗi
        if (!res.data.data) {
          throw new Error("Failed to login with refresh token.");
        }
        // Nếu có dữ liệu người dùng thì lưu access token và refresh token vào localStorage
        this.setSession(res.data.data);
        return {
          data: res.data.data,
          role: "USER",
        };
      })
      // Nếu có lỗi thì reject (kết thúc) với lỗi
      .catch(() => {
        this.logout();
        throw new Error("Failed to login with refresh token.");
      });

  // Hàm cập nhật thông tin người dùng 
  signInWithToken = async () => {
    delete axios.defaults.headers.common.Authorization;
    try {
      const res = await axios.post("/guest/refresh-token", {
        refreshToken: this.getRefreshToken(),
      });
      if (!res.data.data) {
        this.logout();
        throw new Error("Please login!!!");
      }
      const dataToken = {
        accessToken: res.data.data.accessToken,
        refreshToken: res.data.data.refreshToken,
      };
      this.setSession(dataToken);
      return dataToken.accessToken;
    } catch (error) {
      this.logout();
      throw new Error("Failed to login with refresh token.");
    }
  };
  updateUserData = (user) => axios.post("/api/auth/user/update", { user });

  // Hàm Lưu hoặc xóa token trong localStorage
  setSession = (dataToken) => {
    // Nếu có access token thì lưu vào localStorage
    if (dataToken?.accessToken) {
      window.localStorage.setItem(
        apiConfig.accessTokenKey,
        dataToken.accessToken
      );
      window.localStorage.setItem(
        apiConfig.refreshTokenKey,
        dataToken.refreshToken
      );
      // axios.defaults.headers.common.Authorization = `Bearer ${dataToken.accessToken}`;
    } else {
      // Nếu không có access token thì xóa access token và refresh token trong localStorage
      window.localStorage.removeItem(apiConfig.accessTokenKey);
      delete axios.defaults.headers.common.Authorization;
    }
  };

  // Hàm đăng xuất
  logout = () => {
    // Xóa access token và refresh token trong localStorage
    window.localStorage.removeItem(apiConfig.accessTokenKey);
    window.localStorage.removeItem(apiConfig.refreshTokenKey);
    delete axios.defaults.headers.common.Authorization;
    // điều hướng đến trang chủ
    history.push({
      pathname: "/",
    });
  };

  // Hàm kiểm tra token có hợp lệ không
  isAuthTokenValid = (dataToken) => {
    // Nếu không có access token thì trả về false
    if (!dataToken) {
      return false;
    }
    const decodedRefreshToken = jwtDecode(dataToken.refreshToken);
    const decoded = jwtDecode(dataToken.accessToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime && decodedRefreshToken.exp < currentTime) {
      console.warn("access token and refresh token expired");
      history.push("/");
      return false;
    }
    return true;
  };
  // Hàm kiểm tra token có hợp lệ không
  isTokenExpired = () => {
    // Lấy thông tin từ localStorage
    const decodedRefreshToken = jwtDecode(
      window.localStorage.getItem(apiConfig.refreshTokenKey)
    );
    // Lấy thông tin từ localStorage
    const decoded = jwtDecode(
      window.localStorage.getItem(apiConfig.accessTokenKey)
    );
    // Lấy thời gian hiện tại
    const currentTime = Date.now() / 1000;
    // Nếu thời gian hết hạn của access token nhỏ hơn thời gian hiện tại và thời gian hết hạn của refresh token lớn hơn thời gian hiện tại thì trả về false
    if (decoded.exp < currentTime && decodedRefreshToken > currentTime) {
      return false;
    }
    return true;
  };
  // Hàm lấy access token từ localStorage
  getAccessToken = () => window.localStorage.getItem(apiConfig.accessTokenKey);
  // Hàm lấy refresh token từ localStorage
  getRefreshToken = () =>
    window.localStorage.getItem(apiConfig.refreshTokenKey);
}

const instance = new JwtService();

export default instance;

/**
 * ->> trước hết ở đây ta cần biết token là gì ?
 * token là một chuỗi mã hóa chứa thông tin về người dùng, được tạo ra bởi server và gửi về cho client sau khi người dùng đăng nhập.
 * token thường được lưu trữ trong localStorage hoặc cookie để xác thực người dùng.
 * - Access token: là token dùng để xác thực người dùng, thường có thời gian hết hạn ngắn (ví dụ: 15 phút).
 * - Refresh token: là token dùng để làm mới access token, thường có thời gian hết hạn dài hơn (ví dụ: 30 ngày).
 * - token giúp bảo mật thông tin người dùng mà không cần gửi password khi gửi yêu cầu HTTP.
 * - token có thể sử dụng nhiều dịch vụ khác nhau mà không cần chia sẻ thông tin nhạy cảm.
 * 
 * ->> Mục đích của JwtService:
 * Quản lý xác thực bằng JWT.
 * Cung cấp các phương thức để đăng nhập, đăng xuất, làm mới token, và kiểm tra tính hợp lệ của token.
 * 
 * ->> Luồng hoạt động chính:
 * Khi ứng dụng khởi động, gọi init để kiểm tra trạng thái xác thực.
 * Nếu token hợp lệ, tự động đăng nhập (onAutoLogin).
 * Nếu token không hợp lệ, tự động đăng xuất (onAutoLogout).
 * Cung cấp các phương thức để đăng nhập bằng mật khẩu hoặc refreshToken.
 * 
 * ->> Kết nối với Redux:
 * Các phương thức như signInWithRefreshToken hoặc logout được gọi từ các action trong Redux để cập nhật trạng thái người dùng.
 */