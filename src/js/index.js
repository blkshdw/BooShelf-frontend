import 'babel-core/polyfill';
import 'string.fromcodepoint';
import React from 'react';
import ReactDOM from 'react-dom';
import ToolboxApp from 'react-toolbox/lib/app';
import Root from './containers/Root';
import 'css/style.scss';
if (!window.Intl) {
    require.ensure([
        'intl'
    ], (require) => {
        require('intl');
        ReactDOM.render(
            <ToolboxApp className="no-overflow">
                <Root />
            </ToolboxApp>,
            document.getElementById('root'));
    })
} else {
    ReactDOM.render(
        <ToolboxApp className="no-overflow">
            <Root />
        </ToolboxApp>,
        document.getElementById('root'));
}
