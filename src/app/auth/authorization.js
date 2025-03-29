import React, { Component } from "react";
import { connect } from "react-redux";
import { matchRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";

import Utils from "app/helpers/utils";
import AppContext from "app/app_context";

class Authorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: true,
      routes,
    };
  }

  componentDidMount() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.accessGranted !== this.state.accessGranted;
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { location, userRole } = props;
    const { pathname } = location;

    const matched = matchRoutes(state.routes, pathname)[0];

    return {
      accessGranted: matched
        ? Utils.hasPermission(matched.route.auth, userRole)
        : true,
    };
  }

  redirectRoute() {
    const { location, userRole, history } = this.props;
    const { pathname } = location;
    if (!userRole || userRole.length === 0) {
      history.push({
        pathname: "/",
        state: { redirectUrl: pathname },
      });
    }
  }

  render() {
    // return this.state.accessGranted ? <>{this.props.children}</> : null;
    return <>{this.props.children}</>;
  }
}

function mapStateToProps({ auth }) {
  return {
    userRole: auth.user.role,
  };
}

Authorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(Authorization));
