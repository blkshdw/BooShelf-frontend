import React, { Component } from 'react';
import { Link } from 'react-router';
// import { FormattedMessage } from 'react-intl';

// import { connect } from 'react-redux';
// import { changeLocale } from 'utils/intl';

// @connect(state => state)
export default class NotFound extends Component {

    render() {
        return (
            <div>
                <div>404 Not Found</div>
                <Link to="/contacts">Go to contacts</Link>
                {/* <button onClick={() => this.props.dispatch(changeLocale('en_US'))}>EN</button>
                <button onClick={() => this.props.dispatch(changeLocale('ru_RU'))}>RU</button>
                <FormattedMessage id="filesDidntLoad" />*/}
            </div>
        );
    }
}
