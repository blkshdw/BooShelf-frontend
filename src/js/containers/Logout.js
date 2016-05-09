import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutSubmit } from 'actions';
import { replaceState } from 'redux-router';
import { isAuthenticatedSelector } from 'selectors';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logoutSubmit, replaceState }, dispatch);
}

@connect(isAuthenticatedSelector, mapDispatchToProps)
export default class Logout extends Component {

    static propTypes = {
        logoutSubmit: PropTypes.func,
        replaceState: PropTypes.func,
        isAuthenticated: PropTypes.bool
    }

    componentWillMount() {
        if (!this.props.isAuthenticated) {
            this.props.replaceState(null, '/login');
        }
        this.props.logoutSubmit();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isAuthenticated) {
            this.props.replaceState(null, '/login');
        }
    }

    render() {
        return (
            <Loader />
        );
    }
}
