export default {
  items: [
    {
      name: "Dashboard",
      path: "/dashboards",
      children: [],
    },
    {
      name: "Dự báo",
      path: "/forecast",
      children: [],
    },
    {
      name: "Cảnh báo",
      path: "/alerts",
      children: [],
    },
    {
      name: "khuyến nghị",
      path: "/insights",
      children: [],
    },
    {
      name: "Quản lý điểm",
      path: "/location",
      children: [
        {
          path: "/location/new",
          name: "Thêm địa điểm",
        },
        {
          path: "/location/edit",
          name: "Cập nhật địa điểm",
          children: [
            {
              path: "/location/edit/:locationId",
              name: "Cập nhật địa điểm",
            },
          ],
        },
      ],
    },
    {
      name: "Quản lý tài khoản",
      path: "/account",
      children: [],
    },
    {
      path: "/notification/",
      name: "Thông báo",
      children: [
        {
          path: "/notification/new",
          name: "Thông báo mới",
        },
      ],
    },
  ],
};
