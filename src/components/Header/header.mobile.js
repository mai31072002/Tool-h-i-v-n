import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./header.scss";
import { Row, Affix } from "antd";

const HeaderMobile = React.memo((props) => {
  return (
    <Affix offsetTop={1}>
      <Row className="main-header-mobile bg-cl-header-offical"></Row>
    </Affix>
  );
});

HeaderMobile.propTypes = {
  handleCollapse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(HeaderMobile);
