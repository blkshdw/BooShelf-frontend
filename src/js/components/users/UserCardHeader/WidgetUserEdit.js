import React, {Component, PropTypes} from 'react';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import cx from './WidgetUserEdit.styl';

export default class WidgetUserEdit extends Component {
    static propTypes = {
        updateUser: PropTypes.func,
        toggleCreateUserDialog: PropTypes.func,
        active: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            fullName: props.fullName,
            about: props.about,
            birthdayDate: props.birthdayDate
        }
    }

    render() {
        const {active, toggleCreateUserDialog} = this.props;

        return (
            <Modal show={active} onHide={toggleCreateUserDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Update profile</Modal.Title>
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
                                    placeholder="Full Name"
                                    value={this.state.fullName}
                                    onChange={this.handleChangeProp('fullName')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                About
                            </Col>
                            <Col sm={10}>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="About"
                                    value={this.state.about}
                                    onChange={this.handleChangeProp('about')}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Birthday date
                            </Col>
                            <Col sm={10}>
                                <DateTimeField defaultText="Birthday" onChange={date => this.setState({birthdayDate: date})} mode="date" />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={toggleCreateUserDialog}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleUpdateUser}>Update user</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleChangeProp(key) {
        return (event) => {
            this.setState(
                Object.assign(this.state, {
                    [key]: event.target.value
                })
            );
        }
    }

    handleUpdateUser() {
        this.props.updateUser(this.state);
        return this.props.toggleCreateUserDialog();
    }

}