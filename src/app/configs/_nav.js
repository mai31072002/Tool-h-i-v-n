import React from "react";
import Icon from "@ant-design/icons";
import Weather from "assets/img/icon_new/sun-fog.png";
import Category from "assets/img/icon_new/Category.png";
// import Alert from "assets/img/icon_new/Volume-Up.png";
import ManageUser from "assets/img/icon_new/contact.png";
import Insight from "assets/img/icon_new/chart.png";
import Location from "assets/img/icon_new/map.png";
// import Help from "assets/img/icon_new/book.png";
import Report from "assets/img/icon_new/my-report.png";
import WeatherLightmode from "assets/img/icon_new/weather_light_mode.svg";
import DashboardLightmode from "assets/img/icon_new/dashboard_light_mode.svg";
import InsightLightmode from "assets/img/icon_new/insight_light_mode.svg";
import ContactLightmode from "assets/img/icon_new/contact_light_mode.svg";
import LocationLightmode from "assets/img/icon_new/location_light_mode.svg";
import ReportLightmode from "assets/img/icon_new/report_light_mode.svg";
// import HelpLightmode from "assets/img/icon_new/help_light_mode.svg";

const navigation = {
  items: [
    {
      name: "mstSideWeatherName",
      description: "sideWeatherDescription",
      icon: (
        <Icon
          component={() => (
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("primaryThemes") !== "1"
                  ? WeatherLightmode
                  : Weather
              }
              alt={"forecast"}
              // className={"bg-cl-icon-sidebar"}
            />
          )}
        />
      ),
      url: "/weather",
      children: [],
    },
    {
      name: "mstSideDashboardName",
      description: "sideDashboardDescription",
      icon: (
        <Icon
          component={() => (
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("primaryThemes") !== "1"
                  ? DashboardLightmode
                  : Category
              }
              alt={"dashboard"}
              // className={"bg-cl-icon-sidebar"}
            />
          )}
        />
      ),
      url: "/dashboards",
      children: [],
    },
    {
      icon: (
        <Icon
          component={() => (
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("primaryThemes") !== "1"
                  ? InsightLightmode
                  : Insight
              }
              alt={"insight"}
              // className={"bg-cl-icon-sidebar"}
            />
          )}
        />
      ),
      name: "mstSideInsightName",
      description: "sideInsightDescription",
      url: "/insights",
      children: [],
    },
    {
      name: "mstSideUserName",
      description: "",
      icon: (
        <Icon
          component={() => (
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("primaryThemes") !== "1"
                  ? ContactLightmode
                  : ManageUser
              }
              alt={"alert"}
              className={"ft-color-forecast-btn-icon-current-forecast"}
            />
          )}
        />
      ),
      url: "/contacts",
      children: [],
    },

    {
      name: "mstSidePointName",
      description: "",
      icon: (
        <Icon
          component={() => (
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("primaryThemes") !== "1"
                  ? LocationLightmode
                  : Location
              }
              alt={"location"}
              className={"ft-color-forecast-btn-icon-current-forecast"}
            />
          )}
        />
      ),
      url: "/location",
      children: [],
    },
    {
      name: "mstSideReport",
      description:
        "Cung cấp báo cáo dự báo thời tiết, thủy văn, hải văn theo nhu cầu với mẫu linh hoạt",
      icon: (
        <Icon
          component={() => (
            <img
              style={{ width: "100%" }}
              src={
                localStorage.getItem("primaryThemes") !== "1"
                  ? ReportLightmode
                  : Report
              }
              alt={"report"}
              className={"ft-color-forecast-btn-icon-current-forecast"}
            />
          )}
        />
      ),
      url: "/report",
      children: [],
    },
    // {
    //   name: "mstSideHelpName",
    //   description: "",
    //   icon: (
    //     <Icon
    //       component={() => (
    //         <img
    //           style={{ width: "100%" }}
    //           src={
    //             localStorage.getItem("primaryThemes") !== "1"
    //               ? HelpLightmode
    //               : Help
    //           }
    //           alt={"help"}
    //           className={"ft-color-forecast-btn-icon-current-forecast"}
    //         />
    //       )}
    //     />
    //   ),
    //   url: "/help",
    //   children: [],
    // },
  ],
};

export default navigation;
