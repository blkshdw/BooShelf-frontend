import React, {Component, PropTypes} from 'react';
import {Modal, Button, Tabs, Tab, Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap';
import cx from './WidgetChannelDialog.styl';

export default class WidgetChannelDialog extends React.Component {
    static propTypes = {
        createChannel: PropTypes.func,
        active: PropTypes.bool,
        toggle: PropTypes.func
    };

    state = {
        type: 'telegram-bot',
        telegramBotValue: {},
        vkValue: {},
        vkPersonalValue: {},
        instagramValue: {}
    };

    render() {
        const {active, toggle} = this.props;
        const {type} = this.state;

        return (
            <Modal show={active} onHide={toggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Creating channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        activeKey={type}
                        onSelect={::this.handleTypeSelect}
                    >
                        <Tab eventKey="telegram-bot" title="Telegram Bot">
                            {this.renderTelegramBotForm()}
                        </Tab>

                        <Tab eventKey="vk" title="Vkontakte group">
                            {this.renderVkForm()}
                        </Tab>

                        <Tab eventKey="vk-personal" title="Vkontakte personal">
                            {this.renderVkPersonalForm()}
                        </Tab>

                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggle}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleCreateChannel}>Create</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // @TODO использовать библиотеку для форм
    handleChangeProp(hash, key) {
        return (event) => {
            this.setState(
                Object.assign({}, this.state, {
                    [hash]: Object.assign({}, this.state[hash], {
                        [key]: event.target.value
                    })
                })
            );
        };
    }

    // @TODO вынести отдельгными компонентом
    renderTelegramBotForm() {
        return (
            <div className={cx('form')}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Token
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="token"
                                value={this.state.telegramBotValue.token}
                                onChange={this.handleChangeProp('telegramBotValue', 'token')}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    renderVkForm() {
        return (
            <div className={cx('form')}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="name"
                                value={this.state.vkValue.name}
                                onChange={this.handleChangeProp('vkValue', 'name')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Token
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="token"
                                value={this.state.vkValue.token}
                                onChange={this.handleChangeProp('vkValue', 'token')}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

    renderInstagramForm() {
        return (
            <div className={cx('form')}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="name"
                                value={this.state.instagramValue.name}
                                onChange={this.handleChangeProp('instagramValue', 'name')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="username"
                                value={this.state.instagramValue.username}
                                onChange={this.handleChangeProp('instagramValue', 'username')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="password"
                                value={this.state.instagramValue.password}
                                onChange={this.handleChangeProp('instagramValue', 'password')}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }



    renderVkPersonalForm() {
        return (
            <div className={cx('form')}>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="name"
                                value={this.state.vkPersonalValue.name}
                                onChange={this.handleChangeProp('vkPersonalValue', 'name')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Phone
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="phone"
                                value={this.state.vkPersonalValue.phone}
                                onChange={this.handleChangeProp('vkPersonalValue', 'phone')}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="password"
                                value={this.state.vkPersonalValue.password}
                                onChange={this.handleChangeProp('vkPersonalValue', 'password')}
                            />
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }


    handleTypeSelect(type) {
        this.setState(
            Object.assign({}, this.state, {type})
        );
    }

    handleCreateChannel() {
        switch (this.state.type) {
        case 'telegram-bot':
            return this.handleTelegramBotCreateChannel();
        case 'vk':
            return this.handleVkCreateChannel();
        case 'vk-personal':
            return this.handleVkPersonalCreateChannel();
        case 'instagram':
                return this.handleVkPersonalCreateChannel();
        default:
            throw new Error('Unexpected channel type' + this.state.type);
        }
    }

    handleTelegramBotCreateChannel() {
        const {token} = this.state.telegramBotValue;
        this.props.createChannel({
            provider: 'telegram-bot',
            token: token
        });
        this.props.toggle();
    }

    handleVkCreateChannel() {
        const {token, name} = this.state.vkValue;
        this.props.createChannel({
            provider: 'vk',
            type: 'token',
            token: token,
            name: name
        });
        return this.props.toggle();
    }

    handleVkPersonalCreateChannel() {
        const {phone, password, name} = this.state.vkPersonalValue;
        this.props.createChannel({
            provider: 'vk',
            type: 'password',
            login: phone,
            password: password,
            name: name
        });
    }
}
