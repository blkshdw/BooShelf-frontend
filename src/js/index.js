import 'babel-core/polyfill';
import 'string.fromcodepoint';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import 'css/style.scss';
if (!window.Intl) {
    require.ensure([
        'intl'
    ], (require) => {
        require('intl');
        ReactDOM.render(
                <Root />,
            document.getElementById('root'));
    })
} else {
    ReactDOM.render(
            <Root />,
        document.getElementById('root'));
}
