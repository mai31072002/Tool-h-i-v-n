import React, { useEffect } from "react";
import Provider from "react-redux/es/components/Provider";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";

import history from "@history";
import "animate.css/animate.min.css";
import "assets/scss/weatherplus-admin.scss?v=1.9.0";
import "@fontsource/inter";
import "@fontsource/lemon";
import "app/i18n/i18n.config";
import Layout from "app/layout/layout";
import AppContext from "./app_context";
import routes from "./configs/routes.config";
import store from "./store";
import "moment/locale/vi";
import Authorization from "./auth/authorization";
import Auth from "./auth/auth";
import AuthConfig from "./main/auth/auth.config";
import HomeConfig from "./main/home_page/home.config";
import LoginPage from "./main/auth/login";
import WebFont from "webfontloader";

const App = (props) => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Inter", "Lemon"],
      },
    });
  }, []);
  return (
    <>
      {AuthConfig.guestPath.indexOf(props.path) === -1 &&
      HomeConfig.guestPath.indexOf(props.path) === -1 ? (
        <AppContext.Provider value={{ routes }}>
          <Provider store={store}>
            <BrowserRouter>
              <Auth>
                <Router history={history}>
                  <Authorization>
                    <Layout />
                  </Authorization>
                </Router>
              </Auth>
            </BrowserRouter>
          </Provider>
        </AppContext.Provider>
      ) : (
        <AppContext.Provider value={{ routes }}>
          <Provider store={store}>
            <BrowserRouter>
              <Router history={history}>
                <Layout />
              </Router>
              <Switch>
                <Route exact path="/login" component={LoginPage}></Route>
              </Switch>
            </BrowserRouter>
          </Provider>
        </AppContext.Provider>
      )}
    </>
  );
};
export default App;
