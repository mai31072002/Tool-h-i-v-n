import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Col, Row } from "antd";
import L from "leaflet";
import "leaflet.heat";
import HeatmapOverlay from "leaflet-heatmap";
import moment from "moment";
import Utils from "app/helpers/utils";
import "./style.scss";
import Slider from "@mui/material/Slider";
import imgReload from "../../assets/icon/button_reload_weather.png";
import Icon from "@ant-design/icons";

const useStyles = makeStyles(() => ({
  root: {
    height: 488,
    width: "100%",
    display: "flex",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    "& > div": {
      borderRadius: 8,
      overflow: "hidden",
    },
    "& .gm-style": {
      borderRadius: 8,
      overflow: "hidden",
      "& > div": {
        borderRadius: 8,
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
}));

const MapLeafletThunderstormsMobile = React.memo((props) => {
  const { point, handleClickReloadHeatmap } = props;

  const classes = useStyles();

  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const heat = useRef(null);
  const location = useRef(null);
  const popup = useRef(L.popup());

  const PauseSvg = () => (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="pause-circle"
      width="21px"
      height="21px"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        fill="#87BF3E"
      ></path>
      <path
        d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm-80 524c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304zm224 0c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v304z"
        fill="transparent"
      ></path>
      <path
        d="M424 352h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z"
        fill="#87BF3E"
      ></path>
    </svg>
  );
  const PlaySvg = () => (
    <svg
      viewBox="64 64 896 896"
      focusable="false"
      data-icon="play-circle"
      width="21px"
      height="21px"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
        fill="#87BF3E"
      ></path>
      <path
        d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm164.1 378.2L457.7 677.1a8.02 8.02 0 01-12.7-6.5V353a8 8 0 0112.7-6.5l218.4 158.8a7.9 7.9 0 010 12.9z"
        fill="transparent"
      ></path>
      <path
        d="M676.1 505.3L457.7 346.5A8 8 0 00445 353v317.6a8.02 8.02 0 0012.7 6.5l218.4-158.9a7.9 7.9 0 000-12.9z"
        fill="#87BF3E"
      ></path>
    </svg>
  );
  const PlayIcon = (props) => <Icon component={PlaySvg} {...props} />;
  const PauseIcon = (props) => <Icon component={PauseSvg} {...props} />;

  const handleOnClickReloadHeatMap = () => {
    handleClickReloadHeatmap();
  };

  const [count, setCount] = useState(1);
  const [start, setStart] = useState(true);
  const [precipitation, setPrecipitation] = useState([]);
  const [pid, setPid] = useState(0);
  const [latLng, setLatlng] = useState();
  const [precipitationMain, setPrecipitationMain] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  // const [recommend, setRecommend] = useState();
  const [pointName, setPointName] = useState();

  tileRef.current = L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: "",
      maxZoom: 18,
      id: "weatherplus/ckvw38r5k117o14qexec4403g",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1Ijoid2VhdGhlcnBsdXMiLCJhIjoiY2twZXc0NzRhMGU5YjJ2cDM4bzZuY2FodCJ9.hFHDVQZXv0UwPavktkyp8Q",
    }
  );

  const mapStyles = {
    overflow: "hidden",
    width: "100%",
    // height: "100vh",
    zIndex: "9",
  };
  const handleSliderChange = useCallback((e, value) => {
    setCount(value);
  }, []);
  const tmp = useMemo(() => {
    let tmp = [];

    precipitation?.forEach((item) => {
      tmp.push({
        lat: item[0],
        lng: item[1],
        count: item[2],
        pid: Utils.getPidWeatherPlus10Minutes(item[0], item[1]),
      });
    });
    return tmp;
  }, [precipitation]);

  useEffect(() => {
    // setRecommend(props.point?.recommend);
  }, [props.point.recommend]);

  // const initializingMap = () => {
  //   const container = L.DomUtil.get("map");
  //   if (container != null) {
  //     container.remove();
  //   }
  // };

  useEffect(() => {
    if (mapRef.current === undefined || mapRef.current === null) {
      let mapParams = {
        center: [16.10263879065261, 109.67826514374997],
        zoom: 8,
        zoomControl: false,
        minZoom: 5,
        maxZoom: 12,
        // maxBounds: L.latLngBounds(L.latLng(22, 116), L.latLng(7, 100)),
        layers: [tileRef.current],
      };
      mapRef.current = L.map("map", mapParams);
    }
  }, [mapRef]);

  // Add controls:
  useEffect(() => {
    // Pass a baseLayers object to the layer control:
    L.control
      .layers({
        OpenStreetMap: tileRef.current,
      })
      .addTo(mapRef.current); // Add the control to our map instance

    // Create the zoom control:
    L.control
      .zoom({
        position: "topright",
      })
      .addTo(mapRef.current); // Add the control to our map instance
  }, [mapRef]);

  useEffect(() => {
    mapRef.current.on("click", function (e) {
      setShowPopup(true);
      let pidTmp = Utils.getPidWeatherPlus10Minutes(
        e.latlng
          .toString()
          .replace("LatLng(", "")
          .replace(")", "")
          .split(", ")[0],
        e.latlng
          .toString()
          .replace("LatLng(", "")
          .replace(")", "")
          .split(", ")[1]
      );
      setPid(pidTmp);
      setLatlng(e.latlng);
      // setRain(tmp?.filter((item) => item.pid === pid)[0]?.count);
    });
  }, [mapRef]);

  useEffect(() => {
    if (latLng !== undefined && showPopup) {
      popup.current
        .setLatLng(latLng)
        .setContent(
          latLng.toString().replace("LatLng(", "").replace(")", "") +
            " (<b>" +
            (tmp?.filter((item) => item.pid === pid).length > 0
              ? Math.round(tmp?.filter((item) => item.pid === pid)[0]?.count)
              : "0") +
            "mm</b>)"
        )
        .openOn(mapRef.current)
        .on("remove", function () {
          setShowPopup(false);
        });
    }
  }, [latLng, pid, tmp, showPopup, mapRef]);

  useEffect(() => {
    if (mapRef.current) {
      if (heat.current && heat.current !== undefined && heat.current !== null) {
        mapRef.current.removeLayer(heat.current);
      }

      if (point?.heatmapRainfall?.precipitation1?.length > 0) {
        let cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          // if scaleRadius is false it will be the constant radius used in pixels
          radius: 0.07,
          maxOpacity: 1,
          minOpacity: 0.8,
          // scales the radius based on map zoom
          scaleRadius: true,
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries
          //   (there will always be a red spot with useLocalExtremas true)
          useLocalExtrema: false,
          // which field name in your data represents the latitude - default "lat"
          latField: "lat",
          // which field name in your data represents the longitude - default "lng"
          lngField: "lng",
          // which field name in your data represents the data value - default "value"
          valueField: "count",
          blur: 1,
          gradient: {
            // 0: "#000000",
            0.1: "#66d4fc", // Xanh duong 1
            0.2: "#006ef8", // Xanh duong 2
            0.3: "#0745f8", // Xanh duong 3
            0.4: "#a6fb84", // Xanh la 1
            0.5: "#57fa23", // Xanh la 2
            0.6: "#00e033", // Xanh la 3
            0.7: "#ffd800", // Vang 1
            0.75: "#fea601", // Vang 2
            0.8: "#fe8114", // Cam 1
            0.85: "#fe1d02", // Do
            0.9: "#cc0171", // Tim
            1: "#9800cb", // Tim 2
          },
        };

        heat.current = new HeatmapOverlay(cfg).addTo(mapRef.current);

        if (tmp.length > 0) {
          heat.current?.setData({
            min: 2,
            max: 70,
            data: tmp,
          });
        }
      }
    }
  }, [
    point?.heatmapRainfall?.precipitation1?.length,
    precipitation,
    tmp,
    mapRef,
  ]);

  useEffect(() => {
    let lat = props.point?.heatmapRainfall?.latLng?.split("-")[0];
    let lng = props.point?.heatmapRainfall?.latLng?.split("-")[1];
    setPrecipitationMain(
      tmp?.filter(
        (item) => item.pid === Utils.getPidWeatherPlus10Minutes(lat, lng)
      ).length > 0
        ? tmp?.filter(
            (item) => item.pid === Utils.getPidWeatherPlus10Minutes(lat, lng)
          )[0]?.count
        : "0"
    );
  }, [props.point?.heatmapRainfall?.latLng, tmp]);

  useEffect(() => {
    setPointName(props.point?.pointName);
    setCount(1);
  }, [props.point.pointName]);

  useEffect(() => {
    if (props.point?.heatmapRainfall?.latLng !== undefined) {
      mapRef.current.flyTo(
        new L.LatLng(
          props.point?.heatmapRainfall?.latLng.split("-")[0],
          props.point?.heatmapRainfall?.latLng.split("-")[1]
        ),
        8,
        { animation: true }
      );

      if (
        location.current &&
        location.current !== undefined &&
        location.current !== null
      ) {
        mapRef.current.removeLayer(location.current);
      }
      let lat = props.point?.heatmapRainfall?.latLng?.split("-")[0];
      let lng = props.point?.heatmapRainfall?.latLng?.split("-")[1];

      location.current = L.marker([lat, lng])
        .addTo(mapRef.current)
        .bindPopup(
          "<div style='text-align: center'><div>" +
            pointName +
            "</div>" +
            "<div>" +
            Math.round(lat * 100) / 100 +
            "-" +
            Math.round(lng * 100) / 100 +
            "</div>" +
            "<div><b>(" +
            precipitationMain +
            "mm)</b></div></div>"
        )
        .openPopup();
    }
  }, [
    props.point?.heatmapRainfall?.latLng,
    pointName,
    precipitationMain,
    mapRef,
  ]);

  // const onChange = () => {
  //   setCount(count + 1);
  //   if (count >= 17) {
  //     setCount(1);
  //   }
  // };

  useEffect(() => {
    switch (count) {
      case 1:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation1);
        break;
      case 2:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation2);
        break;
      case 3:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation3);
        break;
      case 4:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation4);
        break;
      case 5:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation5);
        break;
      case 6:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation6);
        break;
      case 7:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation7);
        break;
      case 8:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation8);
        break;
      case 9:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation9);
        break;
      case 10:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation10);
        break;
      case 11:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation11);
        break;
      case 12:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation12);
        break;
      case 13:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation13);
        break;
      case 14:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation14);
        break;
      case 15:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation15);
        break;
      case 16:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation16);
        break;
      case 17:
        setPrecipitation(props.point?.heatmapRainfall?.precipitation17);
        break;
      default:
        setPrecipitation([]);
        break;
    }
  }, [count, props.point?.heatmapRainfall]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (start === true) {
        setCount(count + 1);
        if (count >= 17) {
          setCount(1);
        }
      }
    }, 1000);
    return () => clearInterval(timerId);
  });

  const onStart = () => {
    setStart(!start);
  };

  function formatter(value) {
    return props.point?.dateTime
      ? moment(props.point?.dateTime, "HH:mm DD/MM/YYYY")
          .add(value * 10, "minutes")
          .format("HH:mm")
      : "?";
  }

  return (
    <div>
      <Row>
        <Col span={24} style={{ marginBottom: "5px" }}>
          <Row>
            <Col lg={24} md={24} sm={24}>
              <span className={`weather-map-title cl-text-search-location`}>
                Bản đồ dự báo mưa 3 giờ tới
              </span>
            </Col>
            {props.point?.heatmapRainfall !== null && (
              <Col lg={24} md={24} sm={24}>
                <span className={`weather-map-time`}>
                  cập nhật lúc
                  {" " +
                    moment(props.point?.dateTime, "HH:mm DD/MM/YYYY").format(
                      "HH:mm DD/MM/YYYY"
                    )}
                </span>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <div className={classes.root}>
        <div id="map" style={mapStyles} />
        <div className="rain-color-unit-mobile-thunderstorms">mm</div>
        <div className="rain-color-mobile-thunderstorms">
          <span className="rain-color-milestone" style={{ height: "14.28%" }}>
            70
          </span>
          <span className="rain-color-milestone" style={{ height: "14.28%" }}>
            60
          </span>
          <span className="rain-color-milestone" style={{ height: "14.28%" }}>
            50
          </span>
          <span className="rain-color-milestone" style={{ height: "14.28%" }}>
            40
          </span>
          <span className="rain-color-milestone" style={{ height: "14.28%" }}>
            30
          </span>
          <span className="rain-color-milestone" style={{ height: "14.28%" }}>
            20
          </span>
          <span className="rain-color-milestone" style={{ height: "7.14%" }}>
            10
          </span>
          <span className="rain-color-milestone" style={{ height: "7.14%" }}>
            5
          </span>
        </div>
      </div>
      <Row>
        <Col span={24}>
          {props.point?.heatmapRainfall !== null && (
            <Row style={{ alignItems: "center", paddingTop: "8px" }}>
              <Col span={19}>
                {/* <Slider
                  min={1}
                  max={20}
                  onChange={onChange}
                  value={count}
                  tipFormatter={formatter}
                  tooltipVisible
                  // tooltipPlacement="bottom"
                /> */}
                <Slider
                  size="medium"
                  aria-label="small"
                  valueLabelDisplay="on"
                  // color="primary"
                  defaultValue={0}
                  track={false}
                  step={1}
                  min={1}
                  max={17}
                  value={count}
                  onChange={handleSliderChange}
                  valueLabelFormat={formatter(count)}
                  className={classes.sliderContent}
                />
              </Col>
              <Col span={3}>
                {start === false && (
                  <PlayIcon
                    style={{
                      fontSize: "160%",
                      marginLeft: 8,
                      cursor: "pointer",
                    }}
                    onClick={onStart}
                  />
                )}
                {start === true && (
                  <PauseIcon
                    style={{
                      fontSize: "160%",
                      marginLeft: 8,
                      cursor: "pointer",
                    }}
                    onClick={onStart}
                  />
                )}
                {/*{start === true && (*/}
                {/*    <PauseCircleTwoTone*/}
                {/*        style={{ fontSize: "160%", marginLeft: 10, cursor: "pointer" }}*/}
                {/*        onClick={onStart}*/}
                {/*    />*/}
                {/*)}*/}
              </Col>
              <Col span={2}>
                <img
                  src={imgReload}
                  alt={"reload"}
                  className={
                    "btn-reload-mobi ft-cl-icon-location-search-forecast"
                  }
                  onClick={handleOnClickReloadHeatMap}
                />
              </Col>
            </Row>
          )}
          {props.point?.heatmapRainfall === null && (
            <Col span={20} style={{ fontSize: 15 }}>
              Đang cập nhật dữ liệu bản đồ
            </Col>
          )}
        </Col>
      </Row>
    </div>
  );
});

export default MapLeafletThunderstormsMobile;
