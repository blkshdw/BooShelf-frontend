import React, { Component, PropTypes } from 'react';
import ReduxIntlWrapper from './ReduxIntlWrapper';

export default class ReduxIntlProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        selector: PropTypes.func.isRequired,
    }

    render() {
        return (
            <ReduxIntlWrapper {...this.props} />
        );
    }
}
