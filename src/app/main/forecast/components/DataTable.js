import React, { useState, useEffect } from "react";
import { Col, Row, Table, Dropdown } from "antd";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DownloadOutlined } from "@ant-design/icons";
import { usePapaParse } from "react-papaparse";
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";

const DataTable = ({ customerCode, dataForecast, nameTable }) => {
  const { jsonToCSV } = usePapaParse();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  useEffect(() => {
    if (dataForecast?.data !== null) {
      setTableParams((prevParams) => ({
        ...prevParams,
        pagination: {
          ...prevParams.pagination,
          total: dataForecast.data.length,
        },
      }));
    }
  }, [dataForecast?.data]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columns = [
    {
      key: "stt",
      title: "No.",
      dataIndex: "capacity",
      width: 50,
      render: (_, record, index) => <span key={index}>{index + 1}</span>,
    },
    {
      key: "deviceName",
      title: "Device Name",
      width: 100,
      render: () => <span>{customerCode}</span>,
    },
    {
      key: "dateRange",
      title: "Date Range",
      dataIndex: ["fromTime", "toTime"],
      width: 180,
      render: (_, record, index) => (
        <span key={index}>{`${moment(
          record?.fromTime,
          "YYYY-MM-DDTHH:mm:ss"
        ).format("HH:mm")} - ${moment(
          record?.toTime,
          "YYYY-MM-DDTHH:mm:ss"
        ).format("HH:mm DD-MM-YYYY")}`}</span>
      ),
    },
    {
      key: "forecast",
      title: "Avg Average Wind Speed in 3 Seconds(m/s)",
      dataIndex: "forecast",
      width: 100,
    },
  ];
  const handleDownloadFileCsv = () => {
    const dataPowerForecast = dataForecast?.data?.map((point) => ({
      "Device Name": customerCode,
      "Date Range": `${moment(point.fromTime, "YYYY-MM-DDTHH:mm:ss").format(
        "HH:mm"
      )}-${moment(point.toTime, "YYYY-MM-DDTHH:mm:ss").format(
        "HH:mm DD-MM-YYYY"
      )}`,
      "Avg Average Wind Speed in 3 Seconds(m/s)": point.forecast,
    }));
    const csvDataForecast = jsonToCSV(dataPowerForecast);
    // Tạo Blob và lưu file
    const combineCSV = `Sheet,Forecast\n${csvDataForecast}`;
    const data = new Blob([combineCSV], { type: "text/csv;charset=utf-8" });

    FileSaver.saveAs(
      data,
      `${moment(dataForecast?.data[0].fromTime, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYYMMDDHHmm"
      )}-Data-Wind-Power-Capacity-CSV.csv`
    );
  };
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const handleDownloadFileXLSX = () => {
    const dataPowerForecast = dataForecast?.data?.map((point) => ({
      "Device Name": customerCode,
      "Date Range": `${moment(point.fromTime, "YYYY-MM-DDTHH:mm:ss").format(
        "HH:mm"
      )}-${moment(point.toTime, "YYYY-MM-DDTHH:mm:ss").format(
        "HH:mm DD-MM-YYYY"
      )}`,
      "Avg Average Wind Speed in 3 Seconds(m/s)": point.forecast,
    }));
    const wsDataPowerForecast = XLSX.utils.json_to_sheet(dataPowerForecast);
    const wb = {
      Sheets: {
        Forecast: wsDataPowerForecast,
      },
      SheetNames: ["Forecast"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(
      data,
      `${moment(dataForecast?.data[0].fromTime, "YYYY-MM-DDTHH:mm:ss").format(
        "YYYYMMDDHHmm"
      )}-Data-Wind-Power-Capacity-XLSX.xlsx`
    );
  };
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const pdfData = dataForecast?.data?.map((item, index) => ({
      stt: `${index + 1}`,
      deviceName: customerCode,
      dateRange: `${moment(item.fromTime, "YYYY-MM-DDTHH:mm:ss").format(
        "HH:mm"
      )} - ${moment(item.toTime, "YYYY-MM-DDTHH:mm:ss").format(
        "HH:mm DD-MM-YYYY"
      )}`,
      forecast: `${item.forecast}`,
    }));
    const colHeader = columns.map((col) => ({
      header: col.title,
      dataKey: col.key,
    }));
    console.log("PDF Data:", pdfData);
    console.log("colHeader:", colHeader);
    autoTable(doc, {
      body: pdfData,
      columns: colHeader,
      theme: "grid",
      headStyles: { font: "Inter", halign: "center", fillColor: "#777777" },
      bodyStyles: { font: "Inter", halign: "center", textColor: "#000000" },
      didDrawPage: function (data) {
        doc.setFontSize(14);
        doc.setFont("Inter", "normal", "400");
        doc.text(`${nameTable} Forecast`, data.settings.margin.right, 10, {
          halign: "center",
          valign: "center",
        });
      },
    });

    doc.save("forecast.pdf");
  };
  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => handleDownloadFileCsv()}>
          <span>.csv</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => handleDownloadFileXLSX()}>
          <span>.xlsx</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => handleGeneratePDF()}>
          <span>.pdf</span>
        </div>
      ),
    },
  ];
  return (
    <Row className={"container-table-data-forecast"}>
      <Col span={24} className={"content-table-data-forecast"}>
        <Row>
          <Col span={24} className={"content-title-table"}>
            <Row>
              <Col span={12}>
                <Row>
                  <Col span={24} className={"title-table-data-forecast"}>
                    <span>Power Forecast data</span>
                  </Col>
                  <Col span={24} className={"note-table-data-forecast"}>
                    <span>Last updated: 11:50 AM, Jan 7, 2024</span>
                  </Col>
                </Row>
              </Col>
              <Col span={12} className={"content-btn-download-document"}>
                <Row>
                  <Col span={4} className={"container-btn-download-vis"}>
                    <Dropdown
                      menu={{ items }}
                      trigger={["click"]}
                      className={"btn-download-document"}
                    >
                      <DownloadOutlined className={"icon-download-document"} />
                    </Dropdown>
                    {/*<Button className={"btn-download-document"} onClick={handleGeneratePDF}>*/}
                    {/*    <DownloadOutlined className={"icon-download-document"}/>*/}
                    {/*</Button>*/}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span={24} className={"name-table-data-forecast"}>
            <span>{nameTable} FORECAST</span>
          </Col>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={dataForecast?.data}
              pagination={tableParams.pagination}
              onChange={handleTableChange}
              className={"table-data-forecast"}
              id={"table-forecast"}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default DataTable;
