import tag from "./tag";
import customSelectStyle from "assets/jss/weatherplus-admin/customSelectStyle.js";
import { primaryColor, grayColor } from "assets/jss/weatherplus-admin.js";

const postStyle = {
  ...tag,
  ...customSelectStyle,
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
  paddingTop: {
    paddingTop: "36px",
  },
  imageContainer: {
    width: "100%",
    marginTop: 20,
  },
  image: {
    width: 780,
    height: 300,
    objectFit: "contain",
    border: "1px solid lightgrey",
  },
  editor: {
    paddingTop: 27,
  },
};

export default postStyle;
