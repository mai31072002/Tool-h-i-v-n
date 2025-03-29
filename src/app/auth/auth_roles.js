/*
 * Authorization Roles (vai trò ủy quyền)
 */
const authRoles = {
  // user: Vai trò dành cho người dùng đã đăng nhập. Giá trị là một mảng chứa "USER", có thể được sử dụng để kiểm tra quyền truy cập của người dùng.
  user: ["USER"],
  // Vai trò dành cho khách (người dùng chưa đăng nhập). Giá trị là một mảng rỗng []
  onlyGuest: [],
};

export default authRoles;

/**
 * authRoles được sử dụng để kiểm tra quyền truy cập của người dùng trong ứng dụng.
 * Ví dụ:
 * -> Nếu một route yêu cầu vai trò user, chỉ những người dùng có quyền "USER" mới được phép truy cập.
 * ->Nếu một route yêu cầu vai trò onlyGuest, chỉ những người dùng chưa đăng nhập mới được phép truy cập (ví dụ: trang login).
 */
