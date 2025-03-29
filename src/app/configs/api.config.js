// URL gốc của API backend
const domain =
// Nếu biến môi trường REACT_APP_ENV không phải là "prod" thì sử dụng URL localhost cho nhà phát triển
  process.env.REACT_APP_ENV !== "prod"
    ? "http://localhost:9302"
// Ngược lại sử dụng URL chính thức của API backend cho môi trường sản xuất
    : "https://api-gateway.weatherplus.vn";
// URL gốc của ứng dụng
const domainHome =
// Nếu biến môi trường REACT_APP_ENV không phải là "prod" thì sử dụng URL http://dev.metplus.vn cho nhà phát triển
// Môi trường server phát triển và kiểm tra
  process.env.REACT_APP_ENV !== "prod"
    ? "https://dev.metplus.vn"
    // Ngược lại sử dụng URL chính thức của ứng dụng cho môi trường sản xuất
    : "https://metplus.vn";

const baseURL = `${domain}/api`; // URL gốc cho tất cả các yêu cầu API 
const accessTokenKey = "jwt_access_token"; // Key lưu trữ access token
const refreshTokenKey = "jwt_refresh_token"; // Key lưu trữ refresh token
const rememberUsername = "remembered_username"; // Key lưu trữ tên đăng nhập
const rememberPassword = "remembered_password"; // Key lưu trữ mật khẩu

// URL gốc cho các file công khai (public)
const preFixUrlFile =
  process.env.REACT_APP_ENV !== "prod"
  // Nếu biến môi trường REACT_APP_ENV không phải là "prod" thì sử dụng URL môi trường phát triển cho nhà phát triển
    ? "https://api-gateway-dev.weatherplus.vn/model-forecast/api/guest/public"
    // Ngược lại sử dụng URL chính thức của API backend cho môi trường sản xuất
    : "https://api-gateway.weatherplus.vn/model-forecast/api/guest/public";

// Export các biến cấu hình API và lưu trữ
const apiConfig = {
  baseURL,
  accessTokenKey,
  refreshTokenKey,
  domainHome,
  preFixUrlFile,
  rememberUsername,
  rememberPassword,
};

export default apiConfig;
