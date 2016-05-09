import React, {Component, PropTypes} from 'react';
import cx from './ButtonRadio.styl';

export default class ButtonRadio extends Component {

    static propTypes = {
        name: PropTypes.string,
        onClick: PropTypes.func,
        className: PropTypes.string,
        active: PropTypes.bool
    };

    static defaultProps = {
        onClick: () => {},
        className: '',
        name: '',
        active: false
    };

    render() {
        const { name, className, active } = this.props;
        const sDivClasses = cx('button-radio', className, {active: active});
        return (
            <div className={sDivClasses} onClick={this.props.onClick}>{name}</div>
        );
    }
}
