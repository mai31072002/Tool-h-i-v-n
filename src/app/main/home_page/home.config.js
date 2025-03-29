import React from "react";
import i18next from "i18next";

import { authRoles } from "app/auth";
import en from "./i18n/en";
import { isMobile } from "react-device-detect";
i18next.addResourceBundle("en", "landingPage", en);

const HomeConfig = {
  settings: { layout: "layout-home" },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/",
      exact: true,
      component: React.lazy(() =>
        !isMobile ? import("./home") : import("./home.mobile")
      ),
    },
    {
      path: "/install",
      exact: true,
      component: () => (window.location.href = "https://onelink.to/wbs6hu"),
    },
    {
      path: "/app",
      exact: true,
      component: () => (window.location.href = "https://onelink.to/64wvxa"),
    },
    {
      path: "/mobile",
      exact: true,
      component: () => (window.location.href = "https://onelink.to/vws699"),
    },
  ],
  guestPath: ["/", "/install", "/app", "/mobile"],
};

export default HomeConfig;
