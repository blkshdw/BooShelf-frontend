import React, { Component } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

@connect((state, { selector }) => selector(state))
export default class ReduxIntlWrapper extends Component {
    render() {
        return (
            <IntlProvider {...this.props} />
        );
    }
}
