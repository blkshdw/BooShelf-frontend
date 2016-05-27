import React, { PropTypes, Component } from 'react';
import InputField from './../InputField';
import ButtonRadio from './../ButtonRadio';
import CheckboxField from 'components/CheckboxField';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { injectIntl, intlShape } from 'react-intl';
import cx from './LoginForm.styl';

@injectIntl
export default class LoginForm extends Component {
    static propTypes = {
        intl: intlShape,
        inProgress: PropTypes.bool,
        onLogin: PropTypes.func,
        onRegistration: PropTypes.func,
        error: PropTypes.string
    };

    static defaultProps = {
        onLogin: () => {},
        inProgress: false,
        error: ''
    };

    state = {
        isRegistration: false,
        username: '',
        password: ''
    }

    getValidationEmail() {
        const length = this.state.username.length;
        if (length > 6) return 'success';
        else if (length > 3) return 'warning';
        else if (length > 0) return 'error';
    }

    getValidationPassword() {
        const length = this.state.password.length;
        if (length > 9) return 'success';
        else if (length > 7) return 'warning';
        else if (length > 0) return 'error';
    }

    render() {
        const { intl, inProgress, error } = this.props;
        const { isRegistration } = this.state;

        const sInfoAreaClasses = cx({'info-area': inProgress}, 'box-col', 'form');

        return (
                <div className={cx('box-col align-middle', 'login-form', 'wrap')} onKeyDown={this.handleOnEnter}>
                        <div className={cx('logo', 'wrap')} > </div>
                        <div className={sInfoAreaClasses}>
                            {!isRegistration ?
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                    >
                                        <ControlLabel>Username or email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Username or email"
                                            value={this.state.username}
                                            placeholder="Enter text"
                                            onChange={(e) => this.setState({username: e.target.value})}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                    >
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            type="password"
                                            value={this.state.password}
                                            placeholder="Password"
                                            onChange={(e) => this.setState({password: e.target.value})}
                                        />
                                        <FormControl.Feedback />
                                    </FormGroup>
                                </form> :
                                <form>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationEmail()}
                                    >
                                        <ControlLabel>Username or email</ControlLabel>
                                        <FormControl
                                            type="text"
                                            value={this.state.username}
                                            placeholder="Enter text"
                                            onChange={(e) => this.setState({username: e.target.value})}
                                        />
                                        <FormControl.Feedback />
                                        <HelpBlock>Username should be at least 4 character long.</HelpBlock>
                                    </FormGroup>
                                    <FormGroup
                                        controlId="formBasicText"
                                        validationState={this.getValidationPassword()}
                                    >
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            type="password"
                                            value={this.state.password}
                                            placeholder="Password"
                                            onChange={(e) => this.setState({password: e.target.value})}
                                        />
                                        <FormControl.Feedback />
                                        <HelpBlock>Password should be at least 8 character long</HelpBlock>
                                    </FormGroup>
                                </form>
                            }
                            <div className={cx('error')}>{error}</div>
                            <div className={cx('box-row align-right nowrap', 'content')}>
                                {
                                <CheckboxField
                                    className={cx('registration')}
                                    title={intl.formatMessage({ id: 'profileRegisterAndAuthReg' })}
                                    checked={isRegistration}
                                    onClick={this.handleRegistrationChange}
                                />
                                }
                                <Button disabled={isRegistration && (this.getValidationEmail() == 'error' ||  this.getValidationPassword() == 'error')} onClick={isRegistration ? this.handleRegistrationSubmit : this.handleLoginSubmit}>
                                    {intl.formatMessage({ id: isRegistration ? 'profileRegisterAndAuthReg' : 'connectAuthorization' })}
                                </Button>
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
        const { username, password } = this.state;
        this.props.onLogin({
            username: username,
            password: password
        });
    }

    handleRegistrationSubmit = () => {
        const { username, password } = this.state;
        this.props.onRegistration({
            username: username,
            password: password
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
