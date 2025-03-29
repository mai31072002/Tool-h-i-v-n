import React, { useContext } from "react";
import { renderRoutes, matchRoutes } from "react-router-config";
import AppContext from "app/app_context";
import { useLocation } from "react-router-dom";

import Suspense from "./components/suspense";
// import AuthLayout from "./auth";
import AmdinLayout from "./admin";
// import LandingPage from "./home_page";
import LayoutHome from "./layout_home";

function Layout(props) {
  const appContext = useContext(AppContext);
  const { routes } = appContext;
  const location = useLocation();
  const { pathname } = location;
  const matched = matchRoutes(routes, pathname)[0];

  let layout = "auth";
  if (matched && matched.route.settings) {
    const routeSettings = matched.route.settings;
    if (routeSettings.layout) {
      layout = routeSettings.layout;
    }
  }

  return (
    <div>
      <Suspense>
        {
          layout === "admin" ? (
            <AmdinLayout {...props}>{renderRoutes(routes)}</AmdinLayout>
          ) : (
            <LayoutHome>{renderRoutes(routes)}</LayoutHome>
          )
          //     layout === "layout-home" ? (
          //   <LayoutHome>{renderRoutes(routes)}</LayoutHome>
          // ) : (
          //   <AuthLayout>{renderRoutes(routes)}</AuthLayout>
          // )
        }
      </Suspense>

      {props.children}
    </div>
  );
}

export default React.memo(Layout);
