import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import * as actionCreators from './actions';

import store from './lib/store';
import App from './components/App';

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
);

class Routes extends Component {

  constructor(props) {
    super(props);
    this.props.fetchInitData('url');
  }

  Init() {
    return ({ routes }) => {
      return (
        <div>
          <App />
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </div>
      )
    };
  }

  render() {

    let { routes, r } = this.props;
    if (typeof r === 'undefined') {
      return <App />;
    }

    if (typeof routes === 'undefined') {
      const thisRef = this;
      var routesObj = JSON.parse(JSON.stringify(r.get('route')), function (k, v) {
        if (typeof v === 'string' && v.startsWith('$$')) {
          return thisRef.Init();
        } else {
          return v;
        }
      });

      this.props.initRoutes(routesObj);
      return <div />;

    } else {
      return (
        <Router>
          <div>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </div>
        </Router>
      );
    }
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return { r: state.dos.get('route'), routes: state.dos.get('routes') };
};

export default connect(mapStateToProps, actionCreators)(Routes);