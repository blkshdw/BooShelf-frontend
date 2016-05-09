import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import cx from './ButtonPrimary.styl';

export default class ButtonPrimary extends Component {
    
    static propTypes = {
        to: PropTypes.string,
        active: PropTypes.bool,
        onClick: PropTypes.func,
        style: PropTypes.object,
        activeClassName: PropTypes.string,
        className: PropTypes.string,
        children: PropTypes.node,
    }

    static defaultProps = {
        to: '',
        children: 'Button',
        activeClassName: cx('active'),
        className: '',
        onClick() {}
    }
    
    render() {
        const { active, children, style, className, to, ...rest } = this.props;
        const buttonClassName = cx('box-row', 'button-primary', className, {
            active:  to ? false : active
        });

        return to ? (
            <Link style={{"textDecoration": "none"}} className={buttonClassName} to={to} {...rest}>
                {children}
            </Link>
        ) : (
            <button style={style} className={buttonClassName} {...rest}>
                {children}
            </button>
        );
    }
}
