import React from "react";

import { authRoles } from "app/auth";
// import i18next from "i18next";

// import vi from "./i18n/vi";
// import en from "./i18n/en";
import { isMobileOnly } from "react-device-detect";

// i18next.addResourceBundle("en", "forecast", en);
// i18next.addResourceBundle("vi", "forecast", vi);

const AccountConfig = {
  settings: {
    layout: "admin",
  },
  auth: authRoles.user,
  routes: [
    {
      path: "/account",
      exact: true,
      component: React.lazy(() =>
        isMobileOnly ? import("./account") : import("./account")
      ),
    },
    {
      path: "/update-password",
      exact: true,
      component: React.lazy(() =>
        isMobileOnly
          ? import("./components/update_password")
          : import("./components/update_password")
      ),
    },
  ],
};

export default AccountConfig;
