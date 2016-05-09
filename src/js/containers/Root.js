import React, { Component } from 'react';
import { ReduxRouter } from 'redux-router';
import Routes from './Routes';
import store from '../store';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ReduxIntlProvider } from './intl';
import { intlPropsSelector } from 'selectors/intl';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

addLocaleData(en);
addLocaleData(ru);

addLocaleData({ locale: 'en_US', parentLocale: 'en' });
addLocaleData({ locale: 'ru_RU', parentLocale: 'ru' });

@DragDropContext(HTML5Backend) // eslint-disable-line new-cap
export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ReduxIntlProvider selector={intlPropsSelector}>
                        <ReduxRouter routes={Routes} />
                    </ReduxIntlProvider>
                    {this.renderDevTools()}
                </div>
            </Provider>
        );
    }

    renderDevTools() {
        if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('./DevTools');
            return (
                <DevTools />
            );
        }
    }
}
