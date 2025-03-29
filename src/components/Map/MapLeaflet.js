import React, { useEffect, useRef, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PlayCircleTwoTone, PauseCircleTwoTone } from "@ant-design/icons";
import { Col, Row, Slider } from "antd";
import L from "leaflet";
import "leaflet.heat";
import HeatmapOverlay from "leaflet-heatmap";
import moment from "moment";
import Utils from "app/helpers/utils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    width: "100%",
    display: "flex",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 10,
    boxShadow:
      "10px 10px 20px 0 rgba(109, 109, 109, 0.25), -10px -10px 20px 0 #fafafa",
    [theme.breakpoints.down("xs")]: {
      height: 500,
    },
    // transform: "translate(-10%, -10%) scale(0.833333333)",
    "& > div": {
      borderRadius: 18,
      overflow: "hidden",
    },
    "& .gm-style": {
      borderRadius: 18,
      overflow: "hidden",
      "& > div": {
        borderRadius: 18,
        overflow: "hidden",
      },
    },
  },
  haNoiBox: {
    zIndex: "4 !important",
    "padding-bottom": "8px",
  },
}));

const MapLeaflet = React.memo((props) => {
  const classes = useStyles();

  const mapRef = useRef(null);
  const tileRef = useRef(null);
  const heat = useRef(null);
  const location = useRef(null);
  const popup = useRef(L.popup());

  const [count, setCount] = useState(1);
  const [start, setStart] = useState(true);
  const [precipitation, setPrecipitation] = useState([]);
  const [pid, setPid] = useState(0);
  const [latLng, setLatlng] = useState();
  const [precipitationMain, setPrecipitationMain] = useState(0);
  const [showPopup, setShowPopup] = useState(true);
  const [recommend, setRecommend] = useState();
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
  };
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
    setRecommend(props.point?.recommend);
  }, [props.point.recommend]);

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
  }, []);

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
  }, []);

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
  }, []);

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
  }, [latLng, pid, tmp, showPopup]);

  useEffect(() => {
    if (mapRef.current) {
      if (heat.current && heat.current !== undefined && heat.current !== null) {
        mapRef.current.removeLayer(heat.current);
      }

      if (props.point?.heatmapRainfall?.precipitation1?.length > 0) {
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

        // heat.current = L.heatLayer(precipitation, {
        //   maxZoom: 9,
        //   radius: 25,
        //   blur: 18,
        //   fillOpacity: 0,
        //   opacity: 0.01,
        //   min: 0.1,
        //   max: 12,
        //   gradient: {
        //     0.1: "#66d4fc",
        //     0.2: "#006ef8",
        //     0.4: "#0745f8",
        //     0.6: "#a6fb84",
        //     0.65: "#57fa23",
        //     0.7: "#00e033",
        //     0.75: "#ffd800",
        //     0.8: "#fea601",
        //     0.85: "#fe8114",
        //     0.9: "#fe1d02",
        //     0.95: "#cc0171",
        //     1: "#9800cb",
        //   },
        // }).addTo(mapRef.current);
      }
    }
  }, [props, precipitation, tmp]);

  useEffect(() => {
    let lat = props.point?.heatmapRainfall?.latLng?.split("-")[0];
    let lng = props.point?.heatmapRainfall?.latLng?.split("-")[1];
    setPrecipitationMain(
      tmp?.filter(
        (item) => item.pid === Utils.getPidWeatherPlus10Minutes(lat, lng)
      ).length > 0
        ? Math.round(
            tmp?.filter(
              (item) => item.pid === Utils.getPidWeatherPlus10Minutes(lat, lng)
            )[0]?.count
          )
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
            lat +
            "-" +
            lng +
            "</div>" +
            "<div><b>(" +
            precipitationMain +
            "mm)</b></div></div>"
        )
        .openPopup();
    }
  }, [props.point?.heatmapRainfall?.latLng, pointName, precipitationMain]);

  const onChange = () => {
    setCount(count + 1);
    if (count >= 17) {
      setCount(1);
    }
  };

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
        onChange();
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
          .format("HH:mm DD/MM/YYYY")
      : "Loading...";
  }

  return (
    <div>
      <div className={classes.root}>
        <div id="map" style={mapStyles} />
      </div>
      <Row gutter={15}>
        <Col lg={12} md={24} sm={24}>
          <Row>
            <Col lg={24} md={24} sm={24}>
              <span
                style={{
                  fontFamily: "SF Pro Text",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#D10B0B",
                  lineHeight: "17px",
                }}
              >
                {recommend}
              </span>
            </Col>
            {props.point?.heatmapRainfall !== null && (
              <Col lg={24} md={24} sm={24}>
                <span
                  style={{
                    fontFamily: "SF Pro Text",
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#000000",
                    lineHeight: "15px",
                  }}
                >
                  Bản đồ realtime, cập nhật lúc
                  {" " +
                    moment(props.point?.dateTime, "HH:mm DD/MM/YYYY").format(
                      "HH:mm DD/MM/YYYY"
                    )}
                </span>
              </Col>
            )}
          </Row>
        </Col>
        <Col lg={12} md={24} sm={24}>
          {props.point?.heatmapRainfall !== null && (
            <Row style={{ alignItems: "center" }}>
              <Col span={20}>
                <Slider
                  min={1}
                  max={17}
                  onChange={onChange}
                  value={count}
                  tipFormatter={formatter}
                  tooltipVisible
                  // tooltipPlacement="bottom"
                />
              </Col>
              {start === false && (
                <PlayCircleTwoTone
                  style={{ fontSize: "160%", marginLeft: 5, cursor: "pointer" }}
                  onClick={onStart}
                />
              )}
              {start === true && (
                <PauseCircleTwoTone
                  style={{ fontSize: "160%", marginLeft: 5, cursor: "pointer" }}
                  onClick={onStart}
                />
              )}
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

export default MapLeaflet;
