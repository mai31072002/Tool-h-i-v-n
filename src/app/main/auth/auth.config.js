/**
 * File này định nghĩa các route và cấu hình liên quan đến xác thực, bao gồm các đường dẫn dành cho khách (guestPath) và các thành phần được tải động (lazy-loaded).
 * 
 * guestPath được sử dụng trong file index.js để kiểm tra xem người dùng có đang truy cập một trang dành cho khách hay không.
 */


import React from "react";
// Thư viện quốc tế hóa (i18n) hỗ trợ nhiều ngôn ngữ
import i18next from "i18next";

// Một module hỗ trợ cho i18n
import { authRoles } from "app/auth";
// File chứa các chuỗi ngôn ngữ tiếng Anh cho login
import en from "./i18n/en";

// Thêm các chuỗi ngôn ngữ tiếng Anh vào i18n
i18next.addResourceBundle("en", "login", en);

// Cấu hình cho trang login
const AuthConfig = {
  // layout: "auth": Định nghĩa layout của các trang liên quan đến xác thực (ví dụ: trang login, logout).
  settings: { layout: "auth" },
  // auth: authRoles.onlyGuest: Định nghĩa quyền truy cập cho trang login, logout (chỉ cho khách).
  auth: authRoles.onlyGuest,
  routes: [
    // {
    //   path: "/",
    //   exact: true,
    //   component: React.lazy(() => import("../home_page/home")),
    // },
    {
      // path: "/auth/login": Đường dẫn đến trang login )
      path: "/auto-login",
      exact: true,
      // Tự động đăng nhập, sử dụng React.lazy để tải component auto_login khi cần.
      component: React.lazy(() => import("./auto_login")),
    },
    {
      // path: "/auth/login": Đường dẫn đến trang login )
      path: "/auth/logout",
      exact: true,
      // Đăng xuất, sử dụng React.lazy để tải component logout khi cần.
      component: React.lazy(() => import("./logout")),
    },
  ],

  /**
   * ->> Mục đích chính: guestPath là danh sách các URL không yêu cầu người dùng phải đăng nhập.
   * ->>Cách hoạt động:
   *Khi người dùng truy cập một URL, ứng dụng sẽ kiểm tra xem URL đó có nằm trong guestPath hay không.
   * -> Nếu URL nằm trong guestPath:
   * Ứng dụng hiểu rằng đây là một trang dành cho khách (không yêu cầu đăng nhập).
   * Ứng dụng sẽ render giao diện phù hợp (ví dụ: không cần theme hoặc các bảo vệ khác).
   * 
   * -> Nếu URL không nằm trong guestPath:
   * Ứng dụng hiểu rằng đây là một trang yêu cầu đăng nhập.
   * Nếu người dùng chưa đăng nhập, họ sẽ được chuyển hướng đến trang login.
   * 
   * ->> Lưu ý: guestPath không bắt buộc phải có, nếu không có, ứng dụng sẽ yêu cầu người dùng đăng nhập trước khi truy cập bất kỳ URL nào.
   * 
   * ->> ->> Về index.js: sử lý url của người dùng và hiện thị
   */
  // Don't need login
  guestPath: ["/auth/logout", "/auto-login"],
};

export default AuthConfig;
