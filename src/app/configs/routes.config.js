import React from "react";
import Utils from "app/helpers/utils";
import appsConfigs from "app/main/main.config";

const routeConfigs = [...appsConfigs];

const routes = [
  ...Utils.generateRoutesFromConfigs(routeConfigs, null),
  { component: React.lazy(() => import("../pages/error")) },
];

export default routes;
