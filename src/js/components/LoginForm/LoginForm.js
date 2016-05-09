import React, { PropTypes, Component } from 'react';
import InputField from './../InputField';
import ButtonRadio from './../ButtonRadio';
import { injectIntl, intlShape } from 'react-intl';
import cx from './LoginForm.styl';

@injectIntl
export default class LoginForm extends Component {
    static propTypes = {
        intl: intlShape,
        inProgress: PropTypes.bool,
        onLogin: PropTypes.func,
        onRegistration: PropTypes.func,
        errors: PropTypes.array
    };

    static defaultProps = {
        onLogin: () => {},
        inProgress: false,
        errors: []
    };

    state = {
        isRegistration: false
    }

    render() {
        const { intl, inProgress, errors } = this.props;
        const { isRegistration } = this.state;

        const sInfoAreaClasses = cx({'info-area': inProgress}, 'box-col');

        return (
            <div className={cx('box-row align-middle', 'login-form')} onKeyDown={this.handleOnEnter}>
                <div className={cx('box-col', 'login-bx')}>
                    {/*
                    <div className="box-row align-center">
                        <i className={sIconClasses}></i>
                    </div>
                    */}
                    <div className={sInfoAreaClasses}>
                        {isRegistration ?
                            <div>
                                <InputField className={cx('content')} ref="email" placeholder="Email" disabled={inProgress} />
                                <InputField className={cx('content')} ref="username" placeholder="Username" disabled={inProgress} />
                                <InputField className={cx('content')} ref="fullName" placeholder="Full Name" disabled={inProgress} />
                                <InputField className={cx('content')} ref="password" placeholder="Password" type="password" disabled={inProgress} />
                            </div> :
                            <div>
                                <InputField className={cx('content')} ref="login" placeholder="Username or Email" disabled={inProgress} />
                                <InputField className={cx('content')} ref="password" placeholder="Password" type="password" disabled={inProgress} />
                            </div>
                        }
                        {errors && errors.map((error, idx) => (<div className={cx('error')} key={idx}>{intl.formatMessage({id: error.message}) || error.message}</div>))}
                        <div className={cx('box-row align-right nowrap', 'content')}>
                            {/*
                            <CheckboxField
                                className={cx('registration')}
                                title={intl.formatMessage({ id: 'profileRegisterAndAuthReg' })}
                                checked={isRegistration}
                                onClick={this.handleRegistrationChange}
                            />
                            */}
                            <ButtonRadio
                                className={cx('button')}
                                name={intl.formatMessage({ id: isRegistration ? 'profileRegisterAndAuthReg' : 'connectAuthorization' })}
                                onClick={isRegistration ? this.handleRegistrationSubmit : this.handleLoginSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleRegistrationChange = (event, value) => {
        this.setState({
            isRegistration: !value
        });
    }

    handleLoginSubmit = () => {
        const { login, password } = this.refs;
        this.props.onLogin({
            login: login.value,
            password: password.value
        });
    }

    handleRegistrationSubmit = () => {
        const { email, username, fullName, password } = this.refs;
        this.props.onRegistration({
            email: email.value,
            username: username.value,
            fullName: fullName.value,
            password: password.value
        });
    }

    handleOnEnter = event => {
        if (event.keyCode === 13) {
            return this.state.isRegistration ?
                this.handleRegistrationSubmit() :
                this.handleLoginSubmit();
        }
    }
}
