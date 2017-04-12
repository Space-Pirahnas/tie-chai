import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export default function (ComponentNeedCheck) {
  const Authentication = React.createClass({
    contextTypes: {
      router: PropTypes.object.isRequired
    },
    componentWillMount(){
      if (!this.props.authenticated) {
        this.context.router.push('/');
      }
    },
    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.push('/');
      }
    },
    render() {
      return <ComponentNeedCheck {...this.props} />
    }
  })

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}