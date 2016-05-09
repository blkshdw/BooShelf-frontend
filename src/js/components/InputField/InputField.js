import React, { Component, PropTypes } from 'react';
import cx from './InputField.styl';

export default class InputField extends Component {

    static propTypes = {
        value: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        value: '',
        placeholder: '',
        onChange: () => {},
        className: '',
        type: 'text',
        disabled: false
    };

    constructor(props) {
        super(props);
        this.value = props.value;
        this.state = { 
            value: props.value,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.value !== nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    }

    render() {
        // onChange, value объявлены чтоб они не попали в ...rest
        const { placeholder, className, disabled, children, type, onChange, value, ...rest } = this.props;
        const sDivClasses = cx('input-field', className);
        let inputValue = this.state.value;

        return (
            <div className={sDivClasses}>
                <input required
                    type={type}
                    className={cx('input')} 
                    placeholder={placeholder} 
                    value={inputValue}
                    onChange={::this.handleInputChanges}
                    disabled={disabled}
                    {...rest}
                />
                {!disabled && <label className={cx('label')}>{placeholder}</label>}
                {children}
            </div>
        );
    }

    handleInputChanges(event) {
        event.persist();
        const { value } = event.target;
        this.setState({ value });
        this.props.onChange(event);
        this.value = value;
    }
}
