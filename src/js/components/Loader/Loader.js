import React, { Component } from 'react';
import cx from './Loader.styl';

export default class Loader extends Component {
    render() {
        return (
            <section className={cx('box-row align-middle', 'loader-component')}>
                <div className={cx('gif')}>L</div>
            </section>
        );
    }
}
