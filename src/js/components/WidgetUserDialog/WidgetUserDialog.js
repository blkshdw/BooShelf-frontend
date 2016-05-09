import React, {Component, PropTypes} from 'react';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col} from 'react-bootstrap';

export default class WidgetUserDialog extends Component {
    static propTypes = {
        createUser: PropTypes.func,
        toggleCreateUserDialog: PropTypes.func,
        active: PropTypes.bool
    };

    state = {
        name: '',
        email: '',
        role: 'agent',
        password: ''
    };

    render() {
        const {active, toggleCreateUserDialog, createUser} = this.props;

        return (
            <Modal show={active} onHide={toggleCreateUserDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Adding user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Name
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="text"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.handleChangeProp('name')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    onChange={this.handleChangeProp('email')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalRole">
                            <Col componentClass={ControlLabel} sm={2}>
                                Role
                            </Col>

                            <Col sm={10}>
                                <FormControl
                                    componentClass="select"
                                    placeholder="role"
                                    value={this.state.role}
                                    onChange={this.handleChangeProp('role')}
                                >
                                    {this.roles.map(role => (
                                        <option value={role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    type="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleChangeProp('password')}
                                />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={toggleCreateUserDialog}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleCreateUser}>Create user</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    roles = [
        {value: 'agent', label: 'Agent'},
        {value: 'admin', label: 'Admin'}
    ];

    handleChangeProp(key) {
        return (event) => {
            this.setState(
                Object.assign(this.state, {
                    [key]: event.target.value
                })
            );
        }
    }

    handleCreateUser() {
        this.props.createUser(this.state);
        return this.props.toggleCreateUserDialog();
    }

}