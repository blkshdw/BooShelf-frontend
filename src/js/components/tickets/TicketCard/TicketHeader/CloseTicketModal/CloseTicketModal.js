import React, {Component, PropTypes} from 'react';
import {Modal, Button, FormGroup, FormControl} from 'react-bootstrap';

export default class CloseTicketModal extends Component {
    static propTypes = {
        ticket: PropTypes.object,
        closeTicket: PropTypes.func,
        active: PropTypes.bool,
        toggleCloseTicketDialog: PropTypes.func,
    };

    reasons = [
        {value: 'done', label: 'Done'},
        {value: 'troll', label: 'Troll'},
        {value: 'spam', label: 'Spam'}
    ];

    state = {
        reason: 'done'
    };

    handleChangeReason(event) {
        this.setState({reason: event.target.value});
    };

    render() {
        const {active, toggleCloseTicketDialog} = this.props;
        const {reasons} = this;

        return (
            <Modal show={active} onHide={toggleCloseTicketDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Closing ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup controlId="formControlUser">
                        <FormControl
                            componentClass="select"
                            placeholder="Reason"
                            value={this.state.reason}
                            onChange={::this.handleChangeReason}
                        >
                            {reasons.map(reason => (
                                <option
                                    key={reason.value}
                                    value={reason.value}
                                >
                                    {reason.label}
                                </option>
                            ))}
                        </FormControl>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={toggleCloseTicketDialog}>Cancel</Button>
                    <Button bsStyle="primary" onClick={::this.handleCloseTicket}>Close ticket</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    // @TODO Remove ticket from props
    handleCloseTicket() {
        const {ticket} = this.props;
        const reason = this.state.reason === 'done' ? null : this.state.reason;
        this.props.closeTicket(ticket._id, reason);
        return this.props.toggleCloseTicketDialog();
    }
}
