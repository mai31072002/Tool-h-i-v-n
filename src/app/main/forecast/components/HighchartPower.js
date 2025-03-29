import React, { useEffect } from "react";
import { Col, Row } from "antd";
import "./style.scss";
import Highcharts from "highcharts";
import moment from "moment";
import Utils from "../../../helpers/utils";

const HighchartPower = ({ typeForecast, dataForecast }) => {
  useEffect(() => {
    if (dataForecast?.data !== null) {
      Highcharts.chart("highcharts-element", {
        chart: {
          type: "spline",
          // dashStyle: 'shortdot',
        },
        title: {
          text: `Power Forecast`,
          align: "left",
        },
        subtitle: {
          text: "Last updated: 11:50 AM, Jan 7, 2024",
          align: "left",
        },
        xAxis: {
          type: "category", // Để sử dụng trục x dạng ngày và giờ

          // dateTimeLabelFormats: {
          //     day: '%e %b', // Định dạng hiển thị cho ngày
          //     hour: '%H:00', // Định dạng hiển thị cho giờ
          // },
          // accessibility: {
          //     rangeDescription: 'Range: 2010 to 2020'
          // }
          categories: dataForecast?.data.map((point) => {
            const fromTime = moment(point?.fromTime, "YYYY-MM-DDTHH:mm:ss");
            const toTime = moment(point?.toTime, "YYYY-MM-DDTHH:mm:ss");

            // Kiểm tra nếu là cùng một ngày
            // if (index > 0 && fromTime.isSameOrBefore(moment(array[index - 1]?.toTime, "YYYY-MM-DDTHH:mm:ss"), 'minute')) {
            //     console
            //     // Hiển thị chỉ giờ
            //     return `${fromTime.format("HH:mm")} - ${toTime.format("HH:mm")}`;
            // } else {
            // Hiển thị cả ngày khi sang ngày mới
            return `${fromTime.format("HH:mm")} - ${toTime.format(
              "HH:mm D/M/YYYY"
            )}`;
            // }
          }),
          crosshair: true,
          gridLineWidth: 1,
          // plotBands: [{
          //     color:"rgba(255, 248, 230, 0.50)",
          //     from: Date.UTC(2023, 11, 21, 0, 0),// Thời gian bắt đầu plot band
          //     to: Date.UTC(2023, 11, 22, 0, 0),// Thời gian kết thúc plot band
          // }]
        },
        yAxis: {
          title: {
            text: "Power (MW)",
          },
          plotLines: [
            {
              value: 9,
              color: "#4F4F4F",
              width: 1,
              dashStyle: "LongDash",
              label: {
                text: "Installed Capacity",
                align: "right",
                style: {
                  color: "#000000",
                },
              },
            },
          ],
          gridLineWidth: 0,
        },
        tooltip: {
          headerFormat: `<span class="custom-tooltip-header">{point.key}</span><br/>`,
          crosshairs: true,
          shared: true,
          // pointFormat: '{point.y} MW'
          valueSuffix: " MW",
        },
        legend: {
          // layout: 'vertical',
          borderWidth: 0,
          align: "right",
          verticalAlign: "top",
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: "horizontal",
                  align: "center",
                  verticalAlign: "bottom",
                },
              },
            },
          ],
        },
        plotOptions: {
          spline: {
            lineWidth: 1,
          },
        },
        series: [
          //     {
          //     name: 'Actual',
          //     color:"#4D449B",
          //     data: dataForecast?.data?.map((point) => {
          //         const xValue = `${moment(point?.fromTime,"YYYY-MM-DDTHH:mm:ss").format("HH:mm")} - ${moment(point?.toTime,"YYYY-MM-DDTHH:mm:ss").format("HH:mm DD/MM/YYYY")}`;
          //         const yValue = parseFloat(point?.forecast);
          //
          //         console.log('Actual Point:', { x: xValue, y: yValue }); // Thêm log ở đây
          //
          //         return { y: yValue };
          //     })
          // },
          {
            name: "Forecast",
            dashStyle: "LongDash",
            color: "#9B51E0",
            data: dataForecast?.data?.map((point) => {
              const xValue = `${moment(
                point?.fromTime,
                "YYYY-MM-DDTHH:mm:ss"
              ).format("HH:mm")} - ${moment(
                point?.toTime,
                "YYYY-MM-DDTHH:mm:ss"
              ).format("HH:mm DD/MM/YYYY")}`;
              const yValue = parseFloat(point?.forecast);

              console.log("Actual Point:", { x: xValue, y: yValue }); // Thêm log ở đây

              return { y: yValue };
            }),
          },
        ],
      });
    }
  }, [dataForecast?.data]);
  return (
    <Row className={"row-highchart-forecast"}>
      <Col span={24} className={"row-highchart-forecast"}>
        <div id={"highcharts-element"}></div>
      </Col>
      <Col span={24} className={"note-highchart-forecast"}>
        <Row>
          <Col span={24} className={"title-note-highchart"}>
            <span>Forecasting Parameters</span>
          </Col>
          <Col span={24} className={"content-note-highchart"}>
            <Row>
              <Col span={24} className={"text-note-highchart"}>
                <span>
                  Forecast type:{" "}
                  <span className={"text-note-important-highchart"}>
                    {Utils.getForecastParameter(typeForecast).forecastType}
                  </span>
                </span>
              </Col>
              <Col span={24} className={"text-note-highchart"}>
                <span>
                  Range forecast:{" "}
                  <span className={"text-note-important-highchart"}>
                    {Utils.getForecastParameter(typeForecast).rangeForecast}
                  </span>
                </span>
              </Col>
              <Col span={24} className={"text-note-highchart"}>
                <span>
                  Time resolution:{" "}
                  <span className={"text-note-important-highchart"}>
                    {Utils.getForecastParameter(typeForecast).timeResolution}
                  </span>
                </span>
              </Col>
              <Col span={24} className={"text-note-highchart"}>
                <span>
                  Forecast Update:{" "}
                  <span className={"text-note-important-highchart"}>
                    {Utils.getForecastParameter(typeForecast).forecastUpdate}
                  </span>
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default HighchartPower;
