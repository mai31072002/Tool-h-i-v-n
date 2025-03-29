import React from "react";
import PropTypes from "prop-types";
import "./index.scss";
const Sidebar = React.memo(() => {
  return <></>;
});

Sidebar.propTypes = {
  history: PropTypes.object.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
};

export default Sidebar;
