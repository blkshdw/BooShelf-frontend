import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchInitialDataIfNeeded, fetchTicketsCount } from 'actions';
import { authenticatedAppSelector } from 'selectors';
import Loader from 'components/Loader';
import cx from './AuthenticatedApp.styl';

@connect(authenticatedAppSelector)
export default class AuthenticatedApp extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired
    }

    componentWillMount() {
    }

    render() {
        const { children } = this.props;

        return (
            <section className={cx('auth-app')}>
                {children}
            </section>
        );
    }
}
