import React, { Component, PropTypes } from 'react';
import Loader from 'components/Loader';
import LoginForm from 'components/LoginForm';
import { loginContainerSelector } from 'selectors';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { registrationSubmit, loginSubmit, checkAuth } from 'actions';
import { replaceState } from 'redux-router';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        registrationSubmit,
        loginSubmit,
        checkAuth,
        replaceState
    }, dispatch);
}

@connect(loginContainerSelector, mapDispatchToProps)
export default class Login extends Component {

    static propTypes = {
        nextPathname: PropTypes.string,
        isLoginLoading: PropTypes.bool,
        isCheckAuthLoading: PropTypes.bool,
        registrationSubmit: PropTypes.func,
        loginSubmit: PropTypes.func,
        checkAuth: PropTypes.func,
        errors: PropTypes.array,
        replaceState: PropTypes.func
    }

    componentWillMount() {
        this.props.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.props.replaceState(null, this.props.nextPathname);
        }
    }

    render() {
        const { registrationSubmit, loginSubmit, isLoginLoading, isCheckAuthLoading, errors } = this.props;

        if (isCheckAuthLoading) {
            return (<Loader />);
        }

        return (
            <LoginForm
                onLogin={loginSubmit}
                onRegistration={registrationSubmit}
                inProgress={isLoginLoading}
                errors={errors}
            />
        );
    }
}
