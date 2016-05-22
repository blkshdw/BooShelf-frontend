import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchInitialDataIfNeeded } from 'actions';
import { authenticatedAppSelector } from 'selectors';
import Loader from 'components/Loader';
import cx from './AuthenticatedApp.styl';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchInitialDataIfNeeded }, dispatch);
}

@connect(authenticatedAppSelector, mapDispatchToProps)
export default class AuthenticatedApp extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        ready: PropTypes.bool
    }

    componentWillMount() {
        this.props.fetchInitialDataIfNeeded();
    }
    render() {
        const { children, ready } = this.props;
        if (!ready) {
            return <Loader />
        }

        return (
            <section className={cx('auth-app')}>
                {children}
            </section>
        );
    }
}
