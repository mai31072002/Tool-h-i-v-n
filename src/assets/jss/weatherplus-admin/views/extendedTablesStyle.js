import buttonGroupStyle from "assets/jss/weatherplus-admin/buttonGroupStyle.js";
import customCheckboxRadioSwitch from "assets/jss/weatherplus-admin/customCheckboxRadioSwitch.js";
import { cardTitle, grayColor } from "assets/jss/weatherplus-admin.js";

const extendedTablesStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  right: {
    textAlign: "right",
  },
  center: {
    textAlign: "center",
  },
  description: {
    maxWidth: "150px",
  },
  actionButton: {
    margin: "8px 0",
    padding: "8px",
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative",
    marginRight: "8px",
  },
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
  },
  img: {
    width: "100%",
    height: "auto",
    verticalAlign: "middle",
    border: "0",
  },
  tdName: {
    minWidth: "200px",
    fontWeight: "400",
    fontSize: "1.5em",
  },
  tdNameAnchor: {
    color: grayColor[2],
  },
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300",
  },
  tdNumber: {
    textAlign: "right",
    minWidth: "145px",
    fontWeight: "300",
    fontSize: "1.3em !important",
  },
  tdNumberSmall: {
    marginRight: "3px",
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
  },
  positionAbsolute: {
    position: "absolute",
    right: "0",
    top: "0",
  },
  customFont: {
    fontSize: "16px !important",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

export default extendedTablesStyle;
