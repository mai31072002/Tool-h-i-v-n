import React from "react";
import ReactDOM from "react-dom";
//  Thư viện xử lý ngôn ngữ
import "./i18n";
// Thành phần chính của ứng dụng
import App from "./app/app";
// Đo lường hiệu suất ứng dụng của bạn với các sự kiện web-vitals
import reportWebVitals from "./reportWebVitals";
import AuthConfig from "./app/main/auth/auth.config";
// Cung cấp reCaptcha v3 cho ứng dụng
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
// Cung cấp theme cho ứng dụng
import ThemeProvider from "./app/layout/home-theme-provider";
// Thư viện xử lý ngày tháng
import dayjs from "dayjs";
// Một loạt các plugin mở rộng cho thư viện xử lý ngày tháng
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localeData from "dayjs/plugin/localeData";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
// Nếu không phải là trang khách thì sẽ cung cấp theme cho ứng dụng
if (AuthConfig.guestPath.indexOf(window.location.pathname) === -1) {
  ReactDOM.render(
    // Bao vệ ứng dụng bằng reCaptcha GoogleReCaptchaProvider
    <GoogleReCaptchaProvider reCaptchaKey="6Ley_DogAAAAANNMXPuIvNtaPzFJK6a5-a19wgrF">
      {/* Giúp phát hiện các vấn đề của App */}
      <React.StrictMode>
        {/* Cung cấp chủ đề giao diện */}
        <ThemeProvider>
          {/* Component chính của ứng dụng */}
          <App path={window.location.pathname} />
        </ThemeProvider>
      </React.StrictMode>
    </GoogleReCaptchaProvider>,
    document.getElementById("root")
  );
  // }
} else {
  ReactDOM.render(
    <GoogleReCaptchaProvider reCaptchaKey="6Ley_DogAAAAANNMXPuIvNtaPzFJK6a5-a19wgrF">
      <App path={window.location.pathname} />
    </GoogleReCaptchaProvider>,
    document.getElementById("root")
  );
}
// Gắn tên hiện thị cho App, hưu ích cho việc debug
App.displayName = "App";

reportWebVitals();
