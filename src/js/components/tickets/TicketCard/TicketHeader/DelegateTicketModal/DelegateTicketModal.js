import React, {Component, PropTypes} from 'react';
import {Button, Modal, FormGroup, FormControl} from 'react-bootstrap';
import {some} from 'lodash';

export default class WidgetDelegateTiketDialog extends Component {
    static propTypes = {
        ticket: PropTypes.object,
        delegateTicket: PropTypes.func,
        redirectToList: PropTypes.func,
        active: PropTypes.bool,
        toggleDelegateTicketDialog: PropTypes.func,
        users: PropTypes.array
    };

    constructor(props) {
        super(props);
        if (props.users && props.users.length) {
            this.state = {user: props.users[0]._id};
        } else {
            this.state = {user: null};
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!some(nextProps.users, ['_id', this.state.user])) {
            this.state = {user: nextProps.users[0]._id};
        }
    }

    render() {
        const {users, active, toggleDelegateTicketDialog} = this.props;

        return (
            <Modal show={active} onHide={toggleDelegateTicketDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Delegating ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlUser">
                        <FormControl
                            componentClass="select"
                            placeholder="User"
                            value={this.state.user}
                            onChange={::this.handleChangeUser}
                        >
                            {users.map(user => (
                                <option
                                    key="user._id"
                                    value={user._id}
                                >
                                    {user.name}
                                </option>
                            ))}
                        </FormControl>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleDelegateTicketDialog}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleDelegateTicket}>Delegate</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleChangeUser(event) {
        this.setState({user: event.target.value});
    }

    handleDelegateTicket = () => {
        const {ticket} = this.props;
        this.props.delegateTicket(ticket._id, this.state.user);
        this.props.toggleDelegateTicketDialog();
        return this.props.redirectToList();
    }

}
