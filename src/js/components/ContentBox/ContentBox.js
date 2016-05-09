import React, { Component, PropTypes } from 'react';
import cx from './ContentBox.styl';

export default class ContentBox extends Component {
    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node.isRequired
    };

    static defaultProps = {
        className: ''
    };

    render() {
        const { children, className } = this.props;

        return (
            <main className={cx('content-box', className)}>
                <section className={cx('content')}>
                    {children}
                </section>
            </main>
        );
    }
}
