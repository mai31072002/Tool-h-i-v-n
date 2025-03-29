import PropTypes from "prop-types";
import React from "react";

import Loading from "./loading";
/**
 * React Suspense defaults
 * For to Avoid Repetition
 */
function Suspense(props) {
  return (
    <React.Suspense fallback={<Loading {...props.loadingProps} />}>
      {props.children}
    </React.Suspense>
  );
}

Suspense.propTypes = {
  loadingProps: PropTypes.object,
};

Suspense.defaultProps = {
  loadingProps: {
    delay: 0,
  },
};

export default Suspense;
