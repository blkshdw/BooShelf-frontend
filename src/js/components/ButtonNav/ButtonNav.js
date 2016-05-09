import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import cx from './ButtonNav.styl';

export default class ButtonNav extends Component {
    
    static propTypes = {
        to: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func,
        children: PropTypes.node,
        activeClassName: PropTypes.string,
        className: PropTypes.string,
        vertical: PropTypes.bool
    }

    static defaultProps = {
        to: '',
        children: 'Button',
        className: '',
        active: false,
        vertical: false,
        activeClassName: cx('active'),
        onClick() {}
    }

    render() {
        const { className, active, children, vertical, to, ...rest } = this.props;

        const buttonClassName = cx('nowrap align-middle', 'button-nav', className, {
            'box-col': vertical,
            'box-row': !vertical,
            'active':  to ? false : active
        });

        return to ? (
            <Link className={buttonClassName} to={to} {...rest}>
                {children}
            </Link>
        ) : (
            <button className={buttonClassName} {...rest}>
                {children}
            </button>
        );
    }
}
