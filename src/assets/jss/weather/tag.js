import {
  cardTitle,
  grayColor,
  primaryColor,
} from "assets/jss/weatherplus-admin.js";
import { blackColor, hexToRgb } from "assets/jss/weatherplus-admin.js";

const tagStyle = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  selectFormControl: {
    margin: "0 0 10px 0 !important",
    paddingTop: "30px",
    fontSize: 14,
    color: "#495057",
    "& > div": {
      "&:before": {
        borderBottomWidth: "1px !important",
        borderBottomColor: grayColor[4] + "!important",
      },
      "&:after": {
        borderBottomColor: primaryColor[0] + "!important",
      },
    },
  },
  formLabel: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.5",
    fontWeight: "400",
    paddingTop: "39px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "right",
    },
    textAlign: "center",
  },
  marginTop30: {
    marginTop: 30,
  },
};

export default tagStyle;
