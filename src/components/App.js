import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Jcanvas from '@jcanvas/core/Jcanvas';
import * as actionCreators from '../actions';

class App extends Component {

  constructor(props) {
    super(props);
  }

  handleEvent(thisRef, actionTerm, func, payload) {
    thisRef.props.execute(thisRef, actionTerm, func, payload);
  }

  render() {

    const { themes, css, defaultProps, ui, func, data } = this.props;
    if (typeof ui === 'undefined') {
      return <div />;
    }

    let thisRef = this;
    var page = JSON.parse(JSON.stringify(ui.get(location.pathname)), function (k, v) {
      if (typeof v === 'string' && v.startsWith(']]')) {
        let arr = v.split(']]');
        return () => thisRef.handleEvent(thisRef, arr[1], func, arr[2]);
      } else if (typeof v === 'string' && v.startsWith('@@')) {
        return (() => data.get(location.pathname)[v.substring(2)])();;
      } else {
        return v;
      }
    });

    return (
      <div>
        <Jcanvas ui={page} themes={themes} css={css} defaultPropsMap={defaultProps} />
      </div>
    );
  }
}

const mapStateToProps = function mapStateToProps(state) {
  return { changing: state.dos.get('changing'), themes: state.dos.get('themes'), css: state.dos.get('css'), defaultProps: state.dos.get('defaultProps'), ui: state.dos.get('ui'), func: state.dos.get('func'), data: state.dos.get('data') };
};

export default withRouter(connect(mapStateToProps, actionCreators)(App));
