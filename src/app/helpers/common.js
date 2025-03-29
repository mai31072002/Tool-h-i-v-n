import React from "react";
import { Empty, Tag, Typography } from "antd";
// import moment from "moment";
// import { SearchOutlined } from "@ant-design/icons";
// import Highlighter from "react-highlight-words";
// import iconStatusOn from "../../assets/img/icon_new/on.png";
// import iconStatusOff from "../../assets/img/icon_new/off.png";
// import { isMobileOnly } from "react-device-detect";
import uuid from "react-uuid";

export const setLocalStorage = (key, value) =>
  localStorage.setItem(
    key,
    typeof value === "object" ? JSON.stringify(value) : value
  );

export const getLocalStorage = (key) => localStorage.getItem(key) || null;

export const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const recursionOpenKeys = (items, openKeys, pathName) => {
  items.forEach((item) => {
    if (item.children && pathName.indexOf(item.url) !== -1) {
      openKeys.push(item.url);
      recursionOpenKeys(item.children, openKeys, pathName);
    }
  });
  return openKeys;
};

export const renderStatusColor = (status) => {
  let color = null;
  switch (status) {
    case "Success":
      color = "#4dbd74";
      break;
    case "Fail":
      color = "#f86c6b";
      break;
    case "Check":
      color = "#20a8d8";
      break;
    case "Reversal P3":
      color = "#a569bd";
      break;
    case "Khởi tạo":
      color = "#a569bd";
      break;
    case "Hoạt động":
      color = "#4dbd74";
      break;
    case "Chờ duyệt":
      color = "#20a8d8";
      break;
    case "Từ chối":
      color = "#f5b041";
      break;
    case "Tạm khóa":
      color = "#f86c6b";
      break;
    case "Hết hạn":
      color = "#c0392b";
      break;
    case "Đã đóng":
      color = "#f86c6b";
      break;
    case "Chờ kích hoạt":
      color = "#20a8d8";
      break;
    default:
      break;
  }

  return color ? <Tag color={color}>{status}</Tag> : <span>{status}</span>;
};

export const getConditionConvert = (
  elementName,
  hour,
  date,
  operator,
  value
) => {
  let condition = elementName;
  if (hour) {
    condition = condition + "&" + hour;
  }
  if (date !== null) {
    condition = condition + "&" + date;
  }
  const opera = operatorList.filter((op) => op.key === operator)[0];
  condition = condition + opera.value + value;
  return condition;
};

export const operatorList = [
  {
    key: 0,
    value: "=",
  },
  {
    key: 1,
    value: "<",
  },
  {
    key: 2,
    value: "<=",
  },
  {
    key: 3,
    value: ">",
  },
  {
    key: 4,
    value: ">=",
  },
  {
    key: 5,
    value: "=!",
  },
];

export const elementList = [
  {
    key: 3,
    value: "Mưa",
  },
  {
    key: 4,
    value: "Gió",
  },
  {
    key: 5,
    value: "Nhiệt độ",
  },
  {
    key: 6,
    value: "Độ ẩm",
  },
  {
    key: 7,
    value: "Nhiệt độ cảm nhận",
  },
  {
    key: 8,
    value: "Mây",
  },
];

export const hours = [
  {
    key: 1,
    value: "01:00",
  },
  {
    key: 2,
    value: "02:00",
  },
  {
    key: 3,
    value: "03:00",
  },
  {
    key: 4,
    value: "04:00",
  },
  {
    key: 5,
    value: "05:00",
  },
  {
    key: 6,
    value: "06:00",
  },
  {
    key: 7,
    value: "07:00",
  },
  {
    key: 8,
    value: "08:00",
  },
  {
    key: 9,
    value: "09:00",
  },
  {
    key: 10,
    value: "10:00",
  },
  {
    key: 11,
    value: "11:00",
  },
  {
    key: 12,
    value: "12:00",
  },
  {
    key: 13,
    value: "13:00",
  },
  {
    key: 14,
    value: "14:00",
  },
  {
    key: 15,
    value: "15:00",
  },
  {
    key: 16,
    value: "16:00",
  },
  {
    key: 17,
    value: "17:00",
  },
  {
    key: 18,
    value: "18:00",
  },
  {
    key: 19,
    value: "19:00",
  },
  {
    key: 20,
    value: "20:00",
  },
  {
    key: 21,
    value: "21:00",
  },
  {
    key: 22,
    value: "22:00",
  },
  {
    key: 23,
    value: "23:00",
  },
  {
    key: 0,
    value: "00::00",
  },
];

export const locale = (description) => {
  return { emptyText: <Empty description={description} /> };
};

export const EllipsisCustomer = ({ rows, expandable, className, children }) => {
  return (
    <Typography.Paragraph
      className={className}
      key={uuid()}
      ellipsis={{ rows: rows, expandable: expandable, symbol: "Xem thêm" }}
      style={{ height: "auto" }}
    >
      {children}
    </Typography.Paragraph>
  );
};
