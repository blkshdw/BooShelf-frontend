import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';
import cx from './TextareaField.scss';

export default class TextareaField extends Component {

    static propTypes = {
        value: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onKeyDown: PropTypes.func,
        className: PropTypes.string,
        children: PropTypes.node
    };

    static defaultProps = {
        value: '',
        placeholder: '',
        className: '',
        onChange: () => {},
        onKeyDown: () => {},
    };

    constructor(props) {
        super(props);
        this.value = props.value;
        this.state = {
            value: props.value
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value});
            this.value = nextProps.value;
        }
    }

    render() {
        const { placeholder, className, children } = this.props;
        let value = this.state.value;
        return (
            <div className={cx('textarea-field', className)}>
                <Textarea required className={cx('textarea')} ref="message" placeholder={placeholder} value={value} onChange={::this.handleInputChanges} onKeyDown={::this.handleOnEnter}/>
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

    handleOnEnter(event) {
        event.persist();
        this.props.onKeyDown(event, () => {
            this.setState({ value: ''});
            this.value = '';
        });
    }
}
