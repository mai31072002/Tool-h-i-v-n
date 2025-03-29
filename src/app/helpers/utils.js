// eslint-disable-next-line max-classes-per-file
// file chứa các tiện ích và 1 lớp EventEmitter để xử lý sự kiện (quản lý sự kiện)
import _ from "lodash";

class EventEmitter {
  // Khởi tạo mảng chứa các sự kiện
  constructor() {
    this.events = {};
  }

  // Hàm lấy danh sách sự kiện theo tên sự kiện 
  _getEventListByName(eventName) {
    // Nếu sự kiện chưa tồn tại thì khởi tạo mảng rỗng
    if (typeof this.events[eventName] === "undefined") {
      // Khởi tạo mảng rỗng
      this.events[eventName] = new Set();
    }
    // Trả về mảng chứa sự kiện
    return this.events[eventName];
  }

  // Hàm thêm sự kiện (đăng ký một hàm fn cho sự kiện eventName)
  on(eventName, fn) {
    // Thêm hàm fn vào danh sách sự kiện theo tên sự kiện
    this._getEventListByName(eventName).add(fn);
  }

  // Hàm thêm sự kiện (đăng ký một hàm fn cho sự kiện eventName) và chỉ thực thi một lần
  once(eventName, fn) {
    // Lưu lại this (đối tượng EventEmitter)
    const self = this;

    // Hàm thực thi một lần (chỉ thực thi một lần và xóa sự kiện)
    const onceFn = (...args) => {
      // Xóa sự kiện
      self.removeListener(eventName, onceFn);
      // Thực thi hàm fn
      fn.apply(self, args);
    };
    // Thêm hàm onceFn vào danh sách sự kiện theo tên sự kiện
    this.on(eventName, onceFn);
  }

  // phát sự kiện eventName kèm theo các tham số args đến tất cả các hàm đã đăng ký cho sự kiện eventName
  emit(eventName, ...args) {
    // Duyệt qua danh sách các hàm đã đăng ký cho sự kiện eventName
    this._getEventListByName(eventName).forEach(
      // eslint-disable-next-line func-names
      (fn) => {
        // Thực thi hàm fn với các tham số args
        fn.apply(this, args);
      }
    );
  }

  // Xóa sự kiện (hủy đăng ký một hàm fn cho sự kiện eventName)
  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}


class Utils {
  // Hàm lọc mảng theo chuỗi tìm kiếm
  static filterArrayByString(mainArr, searchText) {
    // Nếu chuỗi tìm kiếm rỗng thì trả về mảng gốc
    if (searchText === "") {
      // Trả về mảng gốc
      return mainArr;
    }

    // Chuyển chuỗi tìm kiếm thành chữ thường
    searchText = searchText.toLowerCase();

    // Lọc mảng chính theo chuỗi tìm kiếm
    return mainArr.filter((itemObj) => this.searchInObj(itemObj, searchText));
  }

  // Hàm tìm kiếm trong đối tượng
  static searchInObj(itemObj, searchText) {
    // Nếu đối tượng không tồn tại thì trả về false
    if (!itemObj) {
      return false;
    }

    // Lấy danh sách các thuộc tính của đối tượng
    const propArray = Object.keys(itemObj);

    // Duyệt qua từng thuộc tính của đối tượng
    for (let i = 0; i < propArray.length; i += 1) {
      // Lấy tên thuộc tính
      const prop = propArray[i];
      // Lấy giá trị của thuộc tính
      const value = itemObj[prop];

      // Nếu giá trị là chuỗi
      if (typeof value === "string") {
        // Nếu giá trị chứa chuỗi tìm kiếm thì trả về true
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }
      // Nếu giá trị là mảng 
      else if (Array.isArray(value)) {
        // Nếu mảng chứa chuỗi tìm kiếm thì trả về true
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      // Nếu giá trị là đối tượng ̣(object)
      if (typeof value === "object") {
        // Nếu đối tượng chứa chuỗi tìm kiếm thì trả về true
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
    // Trả về false
    return false;
  }

  // Hàm tìm kiếm trong mảng
  static searchInArray(arr, searchText) {
    // Duyệt qua từng phần tử của mảng 
    arr.forEach((value) => {
      // Nếu phần tử là chuỗi
      if (typeof value === "string") {
        // Nếu phần tử chứa chuỗi tìm kiếm thì trả về true
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      // Nếu phần tử là mảng
      if (typeof value === "object") {
        // Nếu mảng chứa chuỗi tìm kiếm thì trả về true
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
      // Trả về false
      return false;
    });
    return false;
  }

  // Hàm tìm kiếm chuỗi trong chuỗi
  static searchInString(value, searchText) {
    return value.toLowerCase().includes(searchText);
  }

  // Hàm chuyển đổi chuỗi thành chuỗi slug
  static generateGUID() {
    // Hàm tạo chuỗi GUID ngẫu nhiên  
    function S4() {
      // Math.floor: làm tròn số
      // Math.random: tạo số ngẫu nhiên trong khoảng từ 0 đến 1
      return Math.floor((1 + Math.random()) * 0x10000)
      // toString(16): chuyển số sang hệ 16
        .toString(16)   
      // substring(1): lấy chuỗi từ vị trí 1 đến hết
        .substring(1);
    }
    // Gọi hàm S4() 2 lần và nối chuỗi lại để tạo GUID có độ dài 8 chữ số
    return S4() + S4();
  }

  static toggleInArray(item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static handleize(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/\W+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  static setRoutes(config, defaultAuth) {
    let routes = [...config.routes];

    routes = routes.map((route) => {
      let auth =
        config.auth || config.auth === null ? config.auth : defaultAuth || null;
      auth = route.auth || route.auth === null ? route.auth : auth;
      const settings = _.merge({}, config.settings, route.settings);

      return {
        ...route,
        settings,
        auth,
      };
    });

    return [...routes];
  }

  static generateRoutesFromConfigs(configs, defaultAuth) {
    let allRoutes = [];
    configs.forEach((config) => {
      allRoutes = [...allRoutes, ...this.setRoutes(config, defaultAuth)];
    });
    return allRoutes;
  }

  static findById(obj, id) {
    let i;
    let childObj;
    let result;

    if (id === obj.id) {
      return obj;
    }

    for (i = 0; i < Object.keys(obj).length; i += 1) {
      childObj = obj[Object.keys(obj)[i]];

      if (typeof childObj === "object") {
        result = this.findById(childObj, id);
        if (result) {
          return result;
        }
      }
    }
    return false;
  }

  static getFlatNavigation(navigationItems, flatNavigation = []) {
    for (let i = 0; i < navigationItems.length; i += 1) {
      const navItem = navigationItems[i];

      if (navItem.type === "item") {
        flatNavigation.push({
          id: navItem.id,
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url,
          auth: navItem.auth || null,
        });
      }

      if (navItem.type === "collapse" || navItem.type === "group") {
        if (navItem.children) {
          this.getFlatNavigation(navItem.children, flatNavigation);
        }
      }
    }
    return flatNavigation;
  }

  static difference(object, base) {
    function changes(_object, _base) {
      return _.transform(_object, (result, value, key) => {
        if (!_.isEqual(value, _base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(_base[key])
              ? changes(value, _base[key])
              : value;
        }
      });
    }

    return changes(object, base);
  }

  static EventEmitter = EventEmitter;

  static updateNavItem(nav, id, item) {
    return nav.map((_item) => {
      if (_item.id === id) {
        return _.merge({}, _item, item);
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.updateNavItem(_item.children, id, item),
        });
      }

      return _.merge({}, _item);
    });
  }

  static removeNavItem(nav, id) {
    return nav
      .map((_item) => {
        if (_item.id === id) {
          return null;
        }

        if (_item.children) {
          return _.merge({}, _.omit(_item, ["children"]), {
            children: this.removeNavItem(_item.children, id),
          });
        }

        return _.merge({}, _item);
      })
      .filter((s) => s);
  }

  static prependNavItem(nav, item, parentId) {
    if (!parentId) {
      return [item, ...nav];
    }

    return nav.map((_item) => {
      if (_item.id === parentId && _item.children) {
        return {
          _item,
          children: [item, ..._item.children],
        };
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.prependNavItem(_item.children, item, parentId),
        });
      }

      return _.merge({}, _item);
    });
  }

  static appendNavItem(nav, item, parentId) {
    if (!parentId) {
      return [...nav, item];
    }

    return nav.map((_item) => {
      if (_item.id === parentId && _item.children) {
        return {
          _item,
          children: [..._item.children, item],
        };
      }

      if (_item.children) {
        return _.merge({}, _item, {
          children: this.appendNavItem(_item.children, item, parentId),
        });
      }

      return _.merge({}, _item);
    });
  }

  static hasPermission(authArr, userRole) {
    /**
     * If auth array is not defined
     * Pass and allow
     */
    if (authArr === null || authArr === undefined) {
      // console.info("auth is null || undefined:", authArr);
      return true;
    }
    if (authArr.length === 0) {
      /**
       * if auth array is empty means,
       * allow only user role is guest (null or empty[])
       */
      // console.info("auth is empty[]:", authArr);
      return !userRole || userRole.length === 0;
    }
    /**
     * Check if user has grants
     */
    // console.info("auth arr:", authArr);
    /*
            Check if user role is array,
            */
    if (userRole && Array.isArray(userRole)) {
      return authArr.some((r) => userRole.indexOf(r) >= 0);
    }

    /*
            Check if user role is string,
            */
    return authArr.includes(userRole);
  }

  static normURL(title) {
    let normUrl = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/gu, "")
      .replace(":", "")
      .replace(/đ/gu, "d");

    normUrl = normUrl.split(/[[\]()., /\\\-_]+/u).join("-");

    return normUrl;
  }

  static getPidWeatherPlus10Minutes(lat, lng) {
    if (lat === undefined || lng === undefined) {
      return null;
    }
    let j = Math.round((lat - 8.5) / 0.030059814);
    let i = Math.round((lng - 101.5) / 0.030097961);
    return Number(j * 300.0 + i);
  }

  static getNullValue(value) {
    if (
      value !== null &&
      value !== undefined &&
      value !== Number.isNaN &&
      value !== "NaN"
    ) {
      return value;
    }
    return "--";
  }

  static getNullValueNumber(value) {
    if (value !== null && value !== undefined && value !== Number.isNaN) {
      return Math.round(value);
    }
    return "--";
  }

  static getCurrentLocation(address) {
    let district;
    let province;

    for (const addr of address.address_components) {
      if (addr.types.includes("locality") && !district) {
        district = addr.short_name;
      }

      if (addr.types.includes("administrative_area_level_2")) {
        district = addr.short_name;
      }

      if (addr.types.includes("administrative_area_level_1")) {
        province = addr.short_name;
      }
    }

    const displayName = [];
    if (district) displayName.push(district);
    if (province) displayName.push(province);

    return {
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      district: district ? this.normURL(displayName.join(", ")) : null,
      province: province ? this.normURL(province) : null,
      displayName: displayName.join(", "),
    };
  }

  static formatMoney(money) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }

  static getMethodPayment(method) {
    switch (method) {
      case 1:
        return "MOMO";
      case 2:
        return "VNPAY";
      case 3:
        return "VISA/MASTER";
      default:
        return "";
    }
  }

  static renderUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static removeVietnameseString(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
  }

  static removeNumber(str) {
    str = str.replace(/[0-9]/g, "");
    return str;
  }

  static removeSymbol(str) {
    str = str.replace(/[^a-zA-Z ]/g, "");
    return str;
  }

  static getForecastParameter(typeForecast) {
    const noteForecastParam = {
      forecastType: null,
      rangeForecast: null,
      timeResolution: null,
      forecastUpdate: null,
    };

    switch (typeForecast) {
      case "IntraDay":
        noteForecastParam.forecastType = "Intra-day";
        noteForecastParam.rangeForecast = "Next 4 Hours";
        noteForecastParam.timeResolution = "15 Minutes";
        noteForecastParam.forecastUpdate = "Every 15 Minutes";
        break;
      case "DayAhead":
        noteForecastParam.forecastType = "Day-ahead";
        noteForecastParam.rangeForecast =
          "Next 48 Hours (Starting time 48 hours of the following day)";
        noteForecastParam.timeResolution = "30 Minutes";
        noteForecastParam.forecastUpdate =
          "Daily Updated 1st Update = 08:00 AM, 2nd Update = 13:00 PM On day “D”";
        break;
      case "WeekAhead":
        noteForecastParam.forecastType = "Week-ahead";
        noteForecastParam.rangeForecast =
          "Next 14 Days Starting Time Stamp 00:00 (Days = D+1 to D+14)";
        noteForecastParam.timeResolution = "30 Minutes";
        noteForecastParam.forecastUpdate = "Once a Week (Tuesday) 8:00 AM";
        break;
      case "MonthAhead":
        noteForecastParam.forecastType = "Month-ahead";
        noteForecastParam.rangeForecast =
          "1 Month Starting Time Stamp 00:00 Day 1 of the Month";
        noteForecastParam.timeResolution = "1 Hour";
        noteForecastParam.forecastUpdate =
          "Once Every Month on the 15th at 8:00 AM";
        break;
      default:
        break;
    }
    return noteForecastParam;
  }
}
export default Utils;
