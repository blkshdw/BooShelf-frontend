import React, {Component, PropTypes} from 'react';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import moment from 'moment';
import cx from './WidgetUserEdit.styl';

export default class WidgetUserEdit extends Component {
    static propTypes = {
        updateUser: PropTypes.func,
        toggleCreateUserDialog: PropTypes.func,
        active: PropTypes.bool,
        isUpdating: PropTypes.bool,

    };

    constructor(props) {
        super(props);
        this.state = {
            fullName: props.fullName,
            about: props.about,
            birthdayDate: props.birthdayDate
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active && !nextProps.isUpdating && !nextProps.error) {
            this.props.toggleCreateUserDialog();
        }
    }

    render() {
        const {active, toggleCreateUserDialog, isUpdating, error} = this.props;
        const dateProps = this.state.birthdayDate ? {
            dateTime: this.state.birthdayDate
        } : {
            defaultText: "Birthday"
        }
        return (
            <Modal show={active} onHide={toggleCreateUserDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Update profile</Modal.Title>
                </Modal.Header>
                {error && <div style={{"color": "red", "marginLeft": "160px", "marginTop": "5px"}}>Error: {error}</div> }
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
                                <DateTimeField dateTime={this.state.birthdayDate} {...dateProps} onChange={date => this.setState({birthdayDate: date})} mode="date" />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={toggleCreateUserDialog} disabled={isUpdating}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleUpdateUser} disabled={isUpdating}>Update user</Button>
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
        const query = {
            fullName: this.state.fullName,
            about: this.state.about
        }
        if(this.state.birthdayDate !== "Invalid date" && this.state.birthdayDate) {
            query.birthdayDate = this.state.birthdayDate;
        } else {
            this.setState({
                birthdayDate: this.props.birthdayDate
            })
        }
        this.props.updateUser(query);
    }

}