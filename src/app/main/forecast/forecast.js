import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import "./index.scss";
import imgChart from "assets/img/image_forecast/icon_chart.svg";
import imgData from "assets/img/image_forecast/icon_data.svg";
import imgChartActive from "assets/img/image_forecast/icon_chart_active.svg";
import imgDataActive from "assets/img/image_forecast/icon_data_active.svg";
import HighchartPower from "./components/HighchartPower";
import DataTable from "./components/DataTable";
import withReducer from "../../store/with_reducer";
import reducer from "./store/reducers";
import * as ActionForecast from "./store/actions/forecast.action";
import * as ActionAccount from "../account/store/actions/account.action";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
const Forecast = () => {
  const dispatch = useDispatch();
  const [typeForecast, setTypeForecast] = useState("IntraDay");
  const [typeShowData, setTypeShowData] = useState("chart");
  const [nameTableForecast, setNameTableForecast] = useState("INTRA-DAY");

  const { userDetail } = useSelector((state) => state.forecast.account);
  const { dataForecast } = useSelector((state) => state.forecast.forecast);
  console.log("user Detail forecast :", userDetail);
  console.log("data forecast :", dataForecast);

  useEffect(() => {
    dispatch(ActionAccount.getDataUserDetail());
  }, [dispatch]);

  useEffect(() => {
    if (userDetail?.data !== null && userDetail?.data?.customerCode !== "") {
      const dataBody = {
        customerCode: userDetail?.data?.customerCode,
        typeForecast: typeForecast,
        typeEnergy: "wind",
        fromTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        toTime: "",
      };
      dispatch(ActionForecast.fetchDataForecastWithType(dataBody));
    }
  }, [dispatch, userDetail?.data, typeForecast]);

  const handleClickChangeTypeForecast = (typeForecast, nameTableForecast) => {
    setTypeForecast(typeForecast);
    setNameTableForecast(nameTableForecast);
  };
  const handleClickChangeTypeShowData = (type) => {
    setTypeShowData(type);
  };
  // console.log(" type forecast :",typeForecast)
  return (
    <Col span={24} className={"container-forecast"}>
      <Row className={"row-header-forecast"}>
        <Col span={24} className={"content-header-forecast"}>
          <Row className={"row-detail-header-forecast"}>
            <Col span={3}></Col>
            <Col
              span={2}
              className={
                typeForecast === "IntraDay"
                  ? "title-detail-forecast-active"
                  : "title-detail-forecast"
              }
            >
              <span
                onClick={() =>
                  handleClickChangeTypeForecast("IntraDay", "INTRA-DAY")
                }
              >
                Intra-day
              </span>
            </Col>
            <Col
              span={2}
              className={
                typeForecast === "DayAhead"
                  ? "title-detail-forecast-active"
                  : "title-detail-forecast"
              }
            >
              <span
                onClick={() =>
                  handleClickChangeTypeForecast("DayAhead", "DAY-AHEAD")
                }
              >
                Day-ahead
              </span>
            </Col>
            <Col
              span={2}
              className={
                typeForecast === "WeekAhead"
                  ? "title-detail-forecast-active"
                  : "title-detail-forecast"
              }
            >
              <span
                onClick={() =>
                  handleClickChangeTypeForecast("WeekAhead", "WEEK-AHEAD")
                }
              >
                Week-ahead
              </span>
            </Col>
            <Col
              span={2}
              className={
                typeForecast === "MonthAhead"
                  ? "title-detail-forecast-active"
                  : "title-detail-forecast"
              }
            >
              <span
                onClick={() =>
                  handleClickChangeTypeForecast("MonthAhead", "MONTH-AHEAD")
                }
              >
                Month-ahead
              </span>
            </Col>
            {/*<Col span={2} className={typeForecast === "marine"? "title-detail-forecast-active" :"title-detail-forecast"}>*/}
            {/*    <span onClick={() => handleClickChangeTypeForecast("marine")}>*/}
            {/*        Marine*/}
            {/*    </span>*/}
            {/*</Col>*/}
          </Row>
        </Col>
        <Col span={24} className={"content-main-forecast"}>
          <Row>
            <Col span={24} className={"option-forecast"}>
              <Row>
                <Col span={2} className={"cover-detail-option-forecast"}>
                  <span
                    className={
                      typeShowData === "chart"
                        ? "detail-option-forecast-active"
                        : "detail-option-forecast"
                    }
                    onClick={() => handleClickChangeTypeShowData("chart")}
                  >
                    <img
                      src={typeShowData === "chart" ? imgChartActive : imgChart}
                      alt={"icon-chart"}
                      className={"icon-chart"}
                    />
                    <span>Chart</span>
                  </span>
                </Col>
                <Col span={2} className={"cover-detail-option-forecast"}>
                  <span
                    className={
                      typeShowData === "data"
                        ? "detail-option-forecast-active"
                        : "detail-option-forecast"
                    }
                    onClick={() => handleClickChangeTypeShowData("data")}
                  >
                    <img
                      src={typeShowData === "data" ? imgDataActive : imgData}
                      alt={"icon-data"}
                      className={"icon-data"}
                    />
                    <span>Data</span>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
          {typeShowData === "chart" ? (
            <HighchartPower
              typeForecast={typeForecast}
              dataForecast={dataForecast}
            />
          ) : (
            <DataTable
              customerCode={userDetail?.data?.customerCode}
              dataForecast={dataForecast}
              nameTable={nameTableForecast}
            />
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default withReducer("forecast", reducer)(Forecast);
