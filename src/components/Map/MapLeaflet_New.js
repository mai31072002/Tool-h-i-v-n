import React, { useEffect, useRef, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Icon from "@ant-design/icons";
import { Col, Row, Button } from "antd";
import L from "leaflet";
import "leaflet.heat";
// import Draw from "leaflet-draw"
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw-src.css";
import "./style.scss";
import Slider from "@mui/material/Slider";
import iconHideSlider from "assets/icon/iconNowcastPage/button_hide_slider.svg";
import iconPause from "assets/icon/iconNowcastPage/icon_pause.svg";
import iconPlay from "assets/icon/iconNowcastPage/icon_play.svg";
import iconOneRight from "assets/icon/iconNowcastPage/icon_one_right.svg";
import iconOneLeft from "assets/icon/iconNowcastPage/icon_one_left.svg";
import iconTwoRight from "assets/icon/iconNowcastPage/icon_two_right.svg";
import iconTwoLeft from "assets/icon/iconNowcastPage/icon_two_left.svg";
import iconArrowUp from "assets/icon/iconNowcastPage/formkit_up.svg";
import dayjs from "dayjs";
// import imgAreaFlyFir from "assets/img/area_fly_fir.png";
import imgDBZ from "assets/img/image_nowcast/DBZ.jpg";
import imgDBZNowcast from "assets/img/image_nowcast/rainfcst_color.png";
import iconWarning from "assets/icon/icons8-warning-48.png";
import iconInfo from "assets/icon/icons8-info-30.png";
import Utils from "../../app/helpers/utils";
import iconOpacity from "assets/icon/opacity.png";
// import { dataBoundaryVietnam } from "../../app/helpers/data_boundary_vietnam";
import dataBoundaryVN from "assets/datajson/province.json";
import constants from "../../app/helpers/constants";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    height: "calc(100vh - 35px)",
    width: "100%",
    display: "flex",
    overflow: "hidden",
    "& > div": {
      overflow: "hidden",
    },
    "& .gm-style": {
      overflow: "hidden",
      "& > div": {
        overflow: "hidden",
      },
    },
  },
  haNoiBox: {
    zIndex: "4 !important",
    "padding-bottom": "8px",
  },
  sliderContent: {
    color: "#786FD5 !important",
    opacity: 1,
  },
  btnReload: {
    padding: "0px 0px 5px 6px",
    cursor: "pointer",
  },
}));

const MapLeaflet = React.memo(
  ({
    listAirport,
    typeResponsive,
    dataResponsive,
    typeCloud,
    dataCloud,
    typeNowcast,
    dataNowcast,
    checkAirport,
    airport,
    typeAreaFly,
    count,
    handleChangeCount,
    handleChangeAirport,
    checkHideTopographic,
    coordinatesAirport,
    typeResponsive2h,
    dataResponsive2h,
  }) => {
    const classes = useStyles();
    const mapRef = useRef(null);
    const tileRef = useRef(null);
    const [showSlider, setShowSlider] = useState(true);
    const responsiveLay = useRef(null);
    const cloudLay = useRef(null);
    const nowcastLay = useRef(null);
    const responsive2hLayer = useRef(null);
    const circleYellowLay = useRef(null);
    const circleRedLay = useRef(null);
    const airportLay = useRef(null);
    const addressWarning = useRef([]);
    const boundaryLay = useRef(null);
    const topographicLay = useRef(null);
    const lineDistanceLay = useRef(null);
    const controlPolylineLay = useRef(null);
    const firLayer = useRef([]);

    // L.popup() là đối tượng giúp ta tạo và quản lý các Popup trên bản đồ
    const popup = useRef(L.popup());
    // const [count, setCount] = useState(6);
    const [start, setStart] = useState(false);
    const [latLng, setLatlng] = useState();
    const [showPopup, setShowPopup] = useState(true);
    const [datetimeSlider, setDatetimeSlider] = useState(dayjs(new Date()));
    const [dateSliderStr, setDateSliderStr] = useState(
      dayjs(new Date()).format("HH:mm DD/MM/YYYY")
    );
    const [zoomLv, setZoomLv] = useState(6);
    const [changeOpacity, setChangeOpacity] = useState(0.8);
    const [showPopupDistance, setShowPopupDistance] = useState(true);
    const dataBoundaryVietnam = JSON.parse(JSON.stringify(dataBoundaryVN));
    const handleClickHiddenSlider = () => {
      setShowSlider(!showSlider);
    };
    // console.log("data boundary :",dataBoundaryVN['type'])
    const handleSliderChange = useCallback(
      (e, value) => {
        handleChangeCount(value);
      },
      [handleChangeCount]
    );

    tileRef.current = L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution: "",
        maxZoom: 18,
        minZoom: 6,
        // id là style trên mapbox mà ta tạo ra. Ta có thể thay đổi id để thay đổi style map
        id: "weatherplus/clmk3liv901rl01pb133icp7j",
        tileSize: 512,
        zoomOffset: -1,
        position: "topleft",
        // token truy cập vào bên cung cấp map là mapbox
        accessToken:
          "pk.eyJ1Ijoid2VhdGhlcnBsdXMiLCJhIjoiY2twZXc0NzRhMGU5YjJ2cDM4bzZuY2FodCJ9.hFHDVQZXv0UwPavktkyp8Q",
      }
    );

    const mapStyles = {
      overflow: "hidden",
      width: "100%",
    };

    useEffect(() => {
      if (mapRef.current === undefined || mapRef.current === null) {
        let mapParams = {
          center: [16.720385051694, 116.25732421875001],
          zoom: 6,
          zoomControl: false,
          minZoom: 6,
          maxZoom: 16,
          // maxBounds: L.latLngBounds(L.latLng(22, 116), L.latLng(7, 100)),
          layers: [tileRef.current],
        };
        mapRef.current = L.map("map", mapParams);
      }
    }, []);

    useEffect(() => {
      // Pass a baseLayers object to the layer control:
      // Sử dụng đối tượng L.control.layers() để tạo một Layer Control (điều khiển các layer) cho bản đồ: Layer Control cho phép người dùng chuyển đổi giữa các layer hiển thị trên bản đồ
      L.control
        .layers({
          OpenStreetMap: tileRef.current,
          // position: "topleft"
        })
        .addTo(mapRef.current); // Add the control to our map instance

      // Create the zoom control:
      L.control
        .zoom({
          position: "topleft",
        })
        .addTo(mapRef.current); // Add the control to our map instance

      const editTableLayer = new L.FeatureGroup();
      editTableLayer.addTo(mapRef.current);

      controlPolylineLay.current = new L.Control.Draw({
        edit: {
          featureGroup: editTableLayer,
          edit: false,
          // remove:false
          // remove: false
        },
        draw: {
          polyline: {
            shapeOptions: {
              color: "#f357a1",
              weight: 5,
            },
            metric: true,
            zIndex: 8,
          },
          polygon: false,
          rectangle: false,
          marker: false,
          circle: false,
          circlemarker: false,
          simpleShape: false,
        },
      }).addTo(mapRef.current);
      // L.control. .addTo(mapRef.current);
      // L.control.scale().addTo(mapRef.current);

      mapRef.current.on("draw:created", (e) => {
        editTableLayer.addLayer(e.layer);
      });
      mapRef.current.on("draw:drawstart", () => {
        if (lineDistanceLay.current) {
          mapRef.current.removeLayer(lineDistanceLay.current);
          setShowPopup(false);
          setShowPopupDistance(false);
        }
      });
      mapRef.current.on("draw:drawstop", () => {
        setShowPopup(false);
        setShowPopupDistance(true);
      });
      mapRef.current.on("draw:deletestart", () => {
        if (lineDistanceLay.current) {
          mapRef.current.removeLayer(lineDistanceLay.current);
          setShowPopup(false);
          setShowPopupDistance(false);
        }
      });
      mapRef.current.on("draw:deletestop", () => {
        setShowPopup(false);
        setShowPopupDistance(true);
      });
    }, []);
    // console.log("checkHideTopographic :",checkHideTopographic)

    useEffect(() => {
      if (mapRef.current) {
        if (checkHideTopographic) {
          topographicLay.current = L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
              attribution: "",
              maxZoom: 18,
              minZoom: 6,
              // id là style trên mapbox mà ta tạo ra. Ta có thể thay đổi id để thay đổi style map
              id: "weatherplus/cllvzec1i00cp01qug7ame3z5",
              tileSize: 512,
              zoomOffset: -1,
              position: "topleft",
              // token truy cập vào bên cung cấp map là mapbox
              accessToken:
                "pk.eyJ1Ijoid2VhdGhlcnBsdXMiLCJhIjoiY2twZXc0NzRhMGU5YjJ2cDM4bzZuY2FodCJ9.hFHDVQZXv0UwPavktkyp8Q",
            }
          ).addTo(mapRef.current);
          mapRef.current.invalidateSize();
        } else {
          if (topographicLay.current) {
            mapRef.current.removeLayer(topographicLay.current);
            mapRef.current.invalidateSize();
          }
        }
      }
    }, [checkHideTopographic]);

    // Phần này có chức năng hiển thị popup chứa thông tin địa điểm, lượng mưa mà ta đang trỏ vào trên bản đồ
    useEffect(() => {
      mapRef.current.on("click", function (e) {
        setShowPopup(true);
        setLatlng(e.latlng);
      });
      mapRef.current.on("zoomend", () => {
        setZoomLv(mapRef.current.getZoom());
      });
    }, []);

    // Đoạn này thực hiện để cập nhật popup tại ví trị latLng, với content và sử dụng hàm openOn để mở Popup trên bản đồ
    useEffect(() => {
      if (latLng !== undefined && showPopup) {
        if (coordinatesAirport !== undefined && showPopupDistance !== false) {
          if (lineDistanceLay.current) {
            mapRef.current.removeLayer(lineDistanceLay.current);
          }
          let boundsCoord = [
            [coordinatesAirport.lat, coordinatesAirport.lng],
            [latLng.lat, latLng.lng],
          ];
          lineDistanceLay.current = L.polygon(boundsCoord, {
            color: "red",
            weight: 1,
          }).addTo(mapRef.current);

          const earthRadius = 6371;
          const dLat = (coordinatesAirport.lat - latLng.lat) * (Math.PI / 180);
          const dLng = (coordinatesAirport.lng - latLng.lng) * (Math.PI / 180);
          const lat1 = latLng.lat * (Math.PI / 180);
          const lat2 = coordinatesAirport.lat * (Math.PI / 180);

          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) *
              Math.sin(dLng / 2) *
              Math.cos(lat1) *
              Math.cos(lat2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const distance = (earthRadius * c).toFixed(2);

          popup.current
            .setLatLng(latLng)
            .setContent(
              `<span>Khoảng cách đến điểm ${latLng.lat.toFixed(
                2
              )}°N, ${latLng.lng.toFixed(2)}°E là ${distance} km </span>`
            )
            .openOn(mapRef.current)
            .on("remove", () => {
              setShowPopup(false);
              mapRef.current.removeLayer(lineDistanceLay.current);
            });
        } else {
          popup.current
            .setLatLng(latLng)
            .setContent(
              `<span>${latLng.lat.toFixed(2)}°N, ${latLng.lng.toFixed(
                2
              )}°E</span>`
            )
            .openOn(mapRef.current)
            .on("remove", function () {
              setShowPopup(false);
            });
        }
      }
    }, [latLng, showPopup, coordinatesAirport, showPopupDistance]);

    useEffect(() => {
      if (typeResponsive !== 0) {
        if (
          dataResponsive?.data !== null &&
          dataResponsive?.data?.filePath.length !== 0
        ) {
          const dataResponsiveNew = dataResponsive.data.filePath.slice(-6);
          // convert time
          const dateTimeStr = dataResponsiveNew[0]?.split("/").slice(-1)[0]; //202308241500
          // console.log("Datetime Str :", dateTimeStr);
          const year = Number(dateTimeStr.slice(4, 8));
          const month = Number(dateTimeStr.slice(8, 10));
          const day = Number(dateTimeStr.slice(10, 12));
          const hour = Number(dateTimeStr.slice(12, 14));
          const minute = Number(dateTimeStr.slice(14, 16));
          const dateN = new Date(year, month - 1, day, hour, minute); // Lưu ý: Tháng trong Date object là 0-indexed (0 đến 11)
          // console.log("date :", dateN);
          setDatetimeSlider(dayjs(dateN));
        }
      } else if (typeCloud !== 0) {
        if (
          dataCloud?.data !== null &&
          dataCloud?.data?.filePath.length !== 0
        ) {
          const dataCloudNew = dataCloud.data.filePath.slice(-5);
          // convert time
          const dateTimeStr = dataCloudNew[0].split("/").slice(-1)[0]; //202308241500
          // console.log("Datetime Str :", dateTimeStr);
          const year = Number(dateTimeStr.slice(3, 7));
          const month = Number(dateTimeStr.slice(7, 9));
          const day = Number(dateTimeStr.slice(9, 11));
          const hour = Number(dateTimeStr.slice(11, 13));
          const minute = Number(dateTimeStr.slice(13, 15));
          const dateN = new Date(year, month - 1, day, hour, minute);
          // console.log("date :", dateN);
          setDatetimeSlider(dayjs(dateN));
        }
      } else if (typeNowcast !== 0) {
        if (
          dataNowcast?.data !== null &&
          dataNowcast?.data?.filePath.length !== 0
        ) {
          // convert time
          const dateTimeStr = dataNowcast.data.filePath[0]
            .split("/")
            .slice(-1)[0];
          const year = Number(dateTimeStr.slice(5, 9));
          const month = Number(dateTimeStr.slice(9, 11));
          const day = Number(dateTimeStr.slice(11, 13));
          const hour = Number(dateTimeStr.slice(13, 15));
          const minute = Number(dateTimeStr.slice(15, 17));
          const dateN = new Date(year, month - 1, day, hour, minute);
          // console.log("date :", dateN);
          setDatetimeSlider(dayjs(dateN));
        }
      } else {
        setDatetimeSlider(dayjs(new Date()));
        setStart(false);
      }
    }, [
      typeResponsive,
      typeCloud,
      typeNowcast,
      dataNowcast,
      dataResponsive,
      dataCloud,
    ]);

    useEffect(() => {
      if (typeResponsive2h !== 0) {
        if (
          dataResponsive2h?.data !== null &&
          dataResponsive2h?.data?.filePath.length !== 0
        ) {
          const dateTimeStr = dataResponsive2h.data.filePath[1]
            .split("/")
            .slice(-1)[0];
          const year = Number(dateTimeStr.slice(8, 12));
          const month = Number(dateTimeStr.slice(12, 14));
          const day = Number(dateTimeStr.slice(14, 16));
          const hour = Number(dateTimeStr.slice(16, 18));
          const minute = Number(dateTimeStr.slice(18, 20));
          const dateN = new Date(year, month - 1, day, hour, minute);
          // console.log("date :", dateN);
          setDatetimeSlider(dayjs(dateN));
        }
      }
    }, [typeResponsive2h, dataResponsive2h]);

    useEffect(() => {
      if (mapRef.current) {
        L.marker([9.253936156814463, 112.50000000000001], {
          icon: L.divIcon({
            className: "text-island-map",
            html: "<Row>Quần Đảo Trường Sa</Row>",
          }),
        }).addTo(mapRef.current);
        L.marker([15.538375926292062, 113.37441406250001], {
          icon: L.divIcon({
            className: "text-island-map-hs",
            html: "<Row>Quần Đảo Hoàng Sa</Row>",
          }),
        }).addTo(mapRef.current);
      }
    }, []);
    // console.log("check airport :",checkAirport)

    // Vẽ vòng tròn cảnh báo trên các sân bay
    useEffect(() => {
      if (checkAirport && listAirport?.data !== null) {
        if (
          circleYellowLay.current &&
          circleYellowLay.current !== undefined &&
          circleYellowLay !== null
        ) {
          mapRef.current.removeLayer(circleYellowLay.current);
        }
        if (
          circleRedLay.current &&
          circleRedLay.current !== undefined &&
          circleRedLay !== null
        ) {
          mapRef.current.removeLayer(circleRedLay.current);
        }
        if (
          airportLay.current &&
          airportLay.current !== undefined &&
          airportLay !== null
        ) {
          mapRef.current.removeLayer(airportLay.current);
        }
        if (airport !== "ALL") {
          if (lineDistanceLay.current) {
            mapRef.current.removeLayer(lineDistanceLay.current);
          }
          // mapRef.current.removeLayer(addressWarning.current);
          let latLngAirport = listAirport?.data?.filter(
            (item) => item.airportCode === airport
          );
          const latLngTarget = L.latLng(
            latLngAirport[0].latitude,
            latLngAirport[0].longitude
          ); // Tọa độ điểm cần zoom
          const zoomN = calculateZoomLevelWithRadius(
            latLngTarget,
            latLngAirport[0].radiusMax
          );
          mapRef.current.flyTo(latLngTarget, zoomN);
          circleYellowLay.current = L.circle(
            [latLngAirport[0].latitude, latLngAirport[0].longitude],
            {
              radius: latLngAirport[0].radiusMax * 1000,
              stroke: true,
              fillColor: "transparent",
              className: "circle-layer",
              color: "yellow",
              weight: 1,
            }
          ).addTo(mapRef.current);

          circleRedLay.current = L.circle(
            [latLngAirport[0].latitude, latLngAirport[0].longitude],
            {
              radius: latLngAirport[0].radiusMin * 1000,
              color: "red",
              fillColor: "transparent",
              className: "circle-layer",
              weight: 1,
            }
          ).addTo(mapRef.current);

          const dataLatLonAirport = Utils.getLatLonLineAirport(airport);
          const airportPolygonCoords = [
            [dataLatLonAirport.latTopLeft, dataLatLonAirport.lonTopLeft],
            [dataLatLonAirport.latTopRight, dataLatLonAirport.lonTopRight],
            [
              dataLatLonAirport.latBottomRight,
              dataLatLonAirport.lonBottomRight,
            ],
            [dataLatLonAirport.latBottomLeft, dataLatLonAirport.lonBottomLeft],
          ];
          airportLay.current = L.polygon(airportPolygonCoords, {
            color: "red", // Màu viền của hình đa giác
            // fillColor: "transparent", // Màu bên trong của hình đa giác (trong suốt)
            opacity: 0.8,
            weight: 1.5, // Độ dày của viền
          }).addTo(mapRef.current);
        } else {
          mapRef.current.flyTo([16.720385051694, 116.25732421875001], 6);
        }
      }
    }, [checkAirport, airport, listAirport?.data]);

    // Tính toán độ zoom của map dựa trên bán kính
    const calculateZoomLevelWithRadius = (targeLatLng, radiusKm) => {
      // R trái đất trong km
      const earthRadius = 6371;
      const zoomLevelAtMaxZoom = 18; // Zoom level tối đa ứng với bán kính

      // tính zoom dựa trên bán kính
      const zoomLevel = Math.min(
        zoomLevelAtMaxZoom,
        Math.log2((earthRadius * 2 * Math.PI * 360) / (256 * radiusKm))
      );

      return zoomLevel;
    };

    // Hiển thị icon cảnh báo trên các sân bay
    useEffect(() => {
      if (
        mapRef.current &&
        listAirport?.data !== null &&
        listAirport?.data?.length > 0
      ) {
        // const markers = []; // Tạo một mảng lưu trữ tất cả các marker để quản lý
        listAirport?.data?.map((item) => {
          const latIcon = parseFloat(item.latitude);
          const lonIcon = parseFloat(item.longitude);
          // console.log(" get zoom :", zoomLv);
          if (airport === "ALL" || zoomLv <= 7) {
            if (item.isReflection) {
              const iconWarningN = L.icon({
                iconUrl: iconWarning,
                iconSize: [16, 16],
                iconAnchor: [16, 16],
              });
              const marker = L.marker([latIcon, lonIcon], {
                icon: iconWarningN,
              }).addTo(mapRef.current);

              addressWarning.current.push(marker);

              marker.on("click", (e) => {
                setLatlng(e.latlng);
                handleChangeAirport(item.airportCode);
              });

              // console.log("detail airport :",item)
              marker.on("mouseover", () => {
                popup.current
                  .setLatLng([latIcon, lonIcon])
                  .setContent(
                    `<span>Cảnh báo vùng mây có ĐPH > 30 dBZ trong bán kính ${item.radiusMax} km</span>`
                  )
                  .openOn(mapRef.current);
              });

              marker.on("mouseout", () => {
                popup.current.close();
              });
            } else {
              const iconInfoN = L.icon({
                iconUrl: iconInfo,
                iconSize: [14, 14],
                iconAnchor: [14, 14],
              });
              const marker = L.marker([latIcon, lonIcon], {
                icon: iconInfoN,
              }).addTo(mapRef.current);
              addressWarning.current.push(marker);

              marker.on("click", () => {
                handleChangeAirport(item.airportCode);
              });
            }
          } else {
            // Xóa tất cả các marker khi airport không phải 'ALL'
            addressWarning.current.forEach((marker) => {
              mapRef.current.removeLayer(marker);
            });
          }
        });
      }
    }, [zoomLv, listAirport?.data, handleChangeAirport, airport]);

    // Hiển thị lớp layer độ phản hồi, mây, nowcast, độ phản hồi 2h
    useEffect(() => {
      if (mapRef.current) {
        if (
          typeResponsive !== 0 &&
          dataResponsive?.data !== null &&
          dataResponsive?.data?.filePath.length !== 0
          // && count <= 6
        ) {
          if (
            responsiveLay.current &&
            responsiveLay.current !== undefined &&
            responsiveLay.current !== null
          ) {
            mapRef.current.removeLayer(responsiveLay.current);
          }
          const [latStrTopRes, lonStrTopRes] =
            dataResponsive.data.topLeft.split(",");
          const [latStrBotRes, lonStrBotRes] =
            dataResponsive.data.bottomRight.split(",");

          const topLeftRes = L.latLng(
            parseFloat(latStrTopRes),
            parseFloat(lonStrTopRes)
          );
          const bottomRightRes = L.latLng(
            parseFloat(latStrBotRes),
            parseFloat(lonStrBotRes)
          );
          const imageBoundsRes = [topLeftRes, bottomRightRes];
          const dataResponsiveNew = dataResponsive.data.filePath.slice(-6);
          const imageUrlRes = `${dataResponsive.data.prefixUri}${
            dataResponsiveNew[
              // count > dataResponsiveNew.length
              //   ? dataResponsiveNew.length
              //   :
              count - 1
            ]
          }`;
          responsiveLay.current = L.imageOverlay(imageUrlRes, imageBoundsRes, {
            opacity: changeOpacity,
            zIndex: 4,
          }).addTo(mapRef.current);
        } else {
          if (
            responsiveLay.current &&
            responsiveLay.current !== undefined &&
            responsiveLay.current !== null
          ) {
            mapRef.current.removeLayer(responsiveLay.current);
          }
        }

        if (
          typeCloud !== 0 &&
          dataCloud?.data !== null &&
          dataResponsive?.data?.filePath.length !== 0
          // && count <= 5
        ) {
          if (
            cloudLay.current &&
            cloudLay.current !== undefined &&
            cloudLay.current !== null
          ) {
            mapRef.current.removeLayer(cloudLay.current);
          }
          const [latStrTopCloud, lonStrTopCloud] =
            dataCloud.data.topLeft.split(",");
          const [latStrBotCloud, lonStrBotCloud] =
            dataCloud.data.bottomRight.split(",");

          const topLeftCloud = L.latLng(
            parseFloat(latStrTopCloud),
            parseFloat(lonStrTopCloud)
          );
          const bottomRightCloud = L.latLng(
            parseFloat(latStrBotCloud),
            parseFloat(lonStrBotCloud)
          );
          const imageBoundsCloud = [topLeftCloud, bottomRightCloud];
          const dataCloudNew = dataCloud.data.filePath.slice(-5);
          const imageUrlCloud = `${dataCloud.data.prefixUri}${
            dataCloudNew[
              // count > dataCloudNew.length ? dataCloudNew.length :
              count - 1
            ]
          }`;
          cloudLay.current = L.imageOverlay(imageUrlCloud, imageBoundsCloud, {
            zIndex: 3,
            opacity: 0.7,
          }).addTo(mapRef.current);
        } else {
          if (
            cloudLay.current &&
            cloudLay.current !== undefined &&
            cloudLay.current !== null
          ) {
            mapRef.current.removeLayer(cloudLay.current);
          }
        }

        if (
          typeNowcast !== 0 &&
          dataNowcast?.data !== null &&
          dataNowcast?.data?.filePath.length !== 0
          // && count >= 6
        ) {
          if (
            nowcastLay.current &&
            nowcastLay.current !== undefined &&
            nowcastLay.current !== null
          ) {
            mapRef.current.removeLayer(nowcastLay.current);
          }
          const [latStrTopNowcast, lonStrTopNowcast] =
            dataNowcast.data.topLeft.split(",");
          const [latStrBotNowcast, lonStrBotNowcast] =
            dataNowcast.data.bottomRight.split(",");
          const topLeftNowcast = L.latLng(
            parseFloat(latStrTopNowcast),
            parseFloat(lonStrTopNowcast)
          );
          const bottomRightNowcast = L.latLng(
            parseFloat(latStrBotNowcast),
            parseFloat(lonStrBotNowcast)
          );
          const imageBoundsNowcast = [topLeftNowcast, bottomRightNowcast];
          const imageUrlNowcast = `${dataNowcast.data.prefixUri}${
            dataNowcast.data.filePath[count - 1]
          }`;

          nowcastLay.current = L.imageOverlay(
            imageUrlNowcast,
            imageBoundsNowcast,
            {
              zIndex: 5,
            }
          ).addTo(mapRef.current);
        } else {
          if (
            nowcastLay.current &&
            nowcastLay.current !== undefined &&
            nowcastLay.current !== null
          ) {
            mapRef.current.removeLayer(nowcastLay.current);
          }
        }

        if (
          typeResponsive2h !== 0 &&
          dataResponsive2h?.data !== null &&
          dataResponsive2h?.data?.filePath.length !== 0 &&
          dataResponsive?.data !== null
        ) {
          if (responsive2hLayer.current) {
            mapRef.current.removeLayer(responsive2hLayer.current);
          }
          if (
            dataResponsive?.data?.filePath.length !== 0 &&
            dataResponsive2h?.data?.filePath.length !== 19
          ) {
            dataResponsive2h?.data?.filePath.unshift(
              dataResponsive?.data?.filePath[
                dataResponsive.data.filePath.length - 1
              ]
            );
          }
          const [latStrTopRes2h, lonStrTopRes2h] =
            dataResponsive2h.data.topLeft.split(",");
          const [latStrBotRes2h, lonStrBotRes2h] =
            dataResponsive2h.data.bottomRight.split(",");
          const topLeftRes2h = L.latLng(
            parseFloat(latStrTopRes2h),
            parseFloat(lonStrTopRes2h)
          );
          const bottomRightRes2h = L.latLng(
            parseFloat(latStrBotRes2h),
            parseFloat(lonStrBotRes2h)
          );
          const imageBoundsRes2h = [topLeftRes2h, bottomRightRes2h];
          const imageUrlRes2h = `${dataResponsive2h.data.prefixUri}${
            dataResponsive2h.data.filePath[count - 1]
          }`;

          responsive2hLayer.current = L.imageOverlay(
            imageUrlRes2h,
            imageBoundsRes2h,
            {
              zIndex: 5,
              opacity: 0.8,
            }
          ).addTo(mapRef.current);
        } else {
          if (
            responsive2hLayer.current &&
            responsive2hLayer.current !== undefined &&
            responsive2hLayer.current !== null
          ) {
            mapRef.current.removeLayer(responsive2hLayer.current);
          }
        }
      }
    }, [
      count,
      typeResponsive,
      dataResponsive?.data,
      typeCloud,
      dataCloud?.data,
      typeNowcast,
      dataNowcast?.data,
      changeOpacity,
      typeResponsive2h,
      dataResponsive2h?.data,
    ]);

    useEffect(() => {
      if (mapRef.current) {
        if (typeAreaFly !== 0) {
          constants.DATA_FIR.map((latlng) => {
            const polylineLay = L.polyline(latlng, {
              color: "#FFFFFF",
              opacity: 0.5,
              weight: 1,
            }).addTo(mapRef.current);
            firLayer.current.push(polylineLay);
          });
        } else {
          if (firLayer.current !== null || firLayer.current !== undefined) {
            firLayer.current.forEach((polylineLay) => {
              mapRef.current.removeLayer(polylineLay);
            });
          }
        }
      }
    }, [typeAreaFly, checkHideTopographic]);
    useEffect(() => {
      if (typeCloud === 2) {
        boundaryLay.current = L.geoJson(dataBoundaryVietnam, {
          style: () => {
            return {
              color: "yellow",
              weight: 0.3,
              opacity: 0.3,
              fillColor: "transparent",
            };
          },
          onEachFeature: function (feature, layer) {
            layer.myTag = "myGeoJSON";
          },
          zIndex: 6,
        }).addTo(mapRef.current);
      } else {
        if (mapRef.current && boundaryLay.current !== null) {
          mapRef.current.eachLayer((layer) => {
            if (layer.myTag && layer.myTag === "myGeoJSON") {
              mapRef.current.removeLayer(layer);
            }
          });
        }
      }
    }, [typeCloud, dataBoundaryVietnam]);

    useEffect(() => {
      setDateSliderStr(
        datetimeSlider
          .add((count - 1) * 10, "minute")
          .format("HH:mm DD/MM/YYYY")
      );
    }, [count, datetimeSlider]);

    useEffect(() => {
      const timeId = setInterval(() => {
        if (start === true) {
          let countLimit =
            typeNowcast !== 0
              ? dataNowcast?.data?.filePath?.length
              : typeResponsive2h !== 0
              ? dataResponsive2h?.data?.filePath?.length
              : 6;
          if (count >= countLimit) {
            handleChangeCount(1);
          } else {
            handleChangeCount(count + 1);
          }
        }
      }, 1000);
      return () => clearInterval(timeId);
    });

    const handleStartSlider = () => {
      setStart(!start);
    };
    const handleDownSlider = () => {
      const countLimit =
        typeNowcast !== 0
          ? dataNowcast?.data?.filePath?.length
          : typeResponsive2h !== 0
          ? dataResponsive2h?.data?.filePath?.length
          : 6;
      if (count > 1) {
        handleChangeCount(count - 1);
      } else {
        handleChangeCount(countLimit);
      }
    };
    const handleDownTopSlider = () => {
      const countLimit =
        typeNowcast !== 0
          ? dataNowcast?.data?.filePath?.length
          : typeResponsive2h !== 0
          ? dataResponsive2h?.data?.filePath?.length
          : 6;
      if (count !== 1) {
        handleChangeCount(1);
      } else {
        handleChangeCount(countLimit);
      }
    };
    const handleUpSlider = () => {
      const countLimit =
        typeNowcast !== 0
          ? dataNowcast?.data?.filePath?.length
          : typeResponsive2h !== 0
          ? dataResponsive2h?.data?.filePath?.length
          : 6;
      if (count < countLimit) {
        handleChangeCount(count + 1);
      } else {
        handleChangeCount(1);
      }
    };
    const handleUpTopSlider = () => {
      const countLimit =
        typeNowcast !== 0
          ? dataNowcast?.data?.filePath?.length
          : typeResponsive2h !== 0
          ? dataResponsive2h?.data?.filePath?.length
          : 6;
      if (count !== countLimit) {
        handleChangeCount(countLimit);
      } else {
        handleChangeCount(1);
      }
    };
    // console.log("count :", count);
    const handleChangeOpacity = (e, value) => {
      // console.log("value opacity :", value);
      setChangeOpacity(value);
    };
    return (
      <Row gutter={24} className={"container-mapleaflet"}>
        <Col span={24} className={"cover-mapleaflet"}>
          <Row style={{ padding: 0 }}>
            <Col className={classes.root}>
              <div id={"map"} style={mapStyles}></div>
              {showSlider ? (
                <div className={"container-slider-time"}>
                  <Row className={"content-slider-time"}>
                    <Col span={24}>
                      <Row>
                        <Col span={22} className={"text-time"}>
                          <span>{dateSliderStr}</span>
                        </Col>
                        <Col span={2} className={"container-btn-hide-slider"}>
                          <Button
                            className={"btn-hide-slider"}
                            onClick={handleClickHiddenSlider}
                          >
                            <img src={iconHideSlider} alt={"iconHideSlider"} />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Slider
                          value={count}
                          valueLabelDisplay="off"
                          // color="D9D9D9"
                          defaultValue={6}
                          track={false}
                          step={1}
                          min={1}
                          max={
                            typeNowcast !== 0
                              ? dataNowcast?.data?.filePath.length
                              : typeResponsive2h !== 0
                              ? dataResponsive2h?.data?.filePath?.length
                              : 6
                          }
                          // marks={[{ value: 6, label: "" }]}
                          included="true"
                          className={"slider-time"}
                          onChange={handleSliderChange}
                        />
                      </Row>
                    </Col>
                    <Col span={24} className={"container-btn-action-slider"}>
                      <Row
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Col
                          span={4}
                          className={"cover-icon"}
                          onClick={handleDownTopSlider}
                        >
                          <Button className={"btn-action-with-slider"}>
                            <img
                              src={iconTwoLeft}
                              alt={"iconTwoLeft"}
                              className={"btn-action-slider"}
                            />
                          </Button>
                        </Col>
                        <Col span={4} className={"cover-icon"}>
                          <Button
                            className={"btn-action-with-slider"}
                            onClick={handleDownSlider}
                          >
                            <img
                              src={iconOneLeft}
                              alt={"iconOneLeft"}
                              className={"btn-action-slider"}
                            />
                          </Button>
                        </Col>
                        <Col span={4} className={"cover-icon"}>
                          <Button
                            className={"btn-action-with-slider"}
                            onClick={handleStartSlider}
                          >
                            <img
                              src={start ? iconPause : iconPlay}
                              alt={"iconPause"}
                              className={"btn-action-slider"}
                            />
                          </Button>
                        </Col>
                        <Col span={4} className={"cover-icon"}>
                          <Button
                            className={"btn-action-with-slider"}
                            onClick={handleUpSlider}
                          >
                            <img
                              src={iconOneRight}
                              alt={"iconOneRight"}
                              className={"btn-action-slider"}
                            />
                          </Button>
                        </Col>
                        <Col span={4} className={"cover-icon"}>
                          <Button
                            className={"btn-action-with-slider"}
                            onClick={handleUpTopSlider}
                          >
                            <img
                              src={iconTwoRight}
                              alt={"iconTwoRight"}
                              className={"btn-action-slider"}
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                    {/*<Col span={24} className={"text-coordinates"}>*/}
                    {/*  <span>32° 18&apos; N 122° 36&apos; W</span>*/}
                    {/*</Col>*/}
                  </Row>
                </div>
              ) : (
                <div className={"container-slider-time-hidden"}>
                  <Row className={"content-slider-time-hidden"}>
                    <Col span={3} className={"container-btn-hide-slider"}>
                      <Button
                        className={"btn-hide-slider"}
                        onClick={handleClickHiddenSlider}
                      >
                        <img src={iconArrowUp} alt={"iconArrowUp"} />
                      </Button>
                    </Col>
                    <Col span={21} className={"title-slider-time"}>
                      <span>Khung thời gian</span>
                    </Col>
                  </Row>
                </div>
              )}
              <div className={"container-slider-change-opacity"}>
                <Row>
                  <Col span={24} className={"container-icon-opacity"}>
                    <img src={iconOpacity} alt={"icon-opcacity"} width={18} />
                  </Col>
                  <Col span={24} className={"content-slider-opacity"}>
                    <Slider
                      vertical="true"
                      defaultValue={changeOpacity}
                      step={0.1}
                      min={0}
                      max={1}
                      className={"slider-change-opacity"}
                      onChange={handleChangeOpacity}
                    />
                  </Col>
                  <Col span={24} className={"text-opacity"}>
                    <span>{changeOpacity}</span>
                  </Col>
                </Row>
              </div>
              <div className={"container-color-bar"}>
                <img
                  src={typeNowcast === 0 ? imgDBZ : imgDBZNowcast}
                  alt={"img-DBZ"}
                  className={"img-color-bar"}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
);

export default MapLeaflet;
