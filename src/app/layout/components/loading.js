import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function Loading(props) {
  const [showLoading, setShowLoading] = useState(!props.delay);

  useEffect(() => {
    setShowLoading(true);
  }, []);

  if (!showLoading) {
    return null;
  }

  return (
    <div className="pageloader">
      <span className="title">Loading...</span>
    </div>
  );
}

Loading.propTypes = {
  delay: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

Loading.defaultProps = {
  delay: false,
};

export default Loading;
