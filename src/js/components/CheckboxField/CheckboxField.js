import React, { Component, PropTypes } from 'react';
import cx from './CheckboxField.styl';

export default class CheckboxField extends Component {
    static propTypes = {
        title: PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        checked: PropTypes.bool
    }

    static defaultProps = {
        title: '',
        checked: false,
        className: '',
        onClick: ()=>{}
    }

    render() {
        const { title, className, checked, onClick } = this.props;

        return (
            <div className={cx('box-row nowrap', 'checkbox-field', className)} onClick={(event) => onClick(event, checked)}>
                <div className={cx('check')}>
                    {checked && <i className={cx('icon-sprite smart-ico-tick', 'icon')}></i>}
                </div>
                {title && <div className={cx('title')}>{title}</div>}
            </div>
        );
    }
}
