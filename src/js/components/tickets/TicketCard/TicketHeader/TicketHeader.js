import React, {Component, PropTypes} from 'react';
import CloseTicketModal from './CloseTicketModal';
import DelegateTicketModal from './DelegateTicketModal';
import cx from './TicketHeader.styl';
import {DropdownButton, MenuItem, Button, ButtonToolbar} from 'react-bootstrap';

export default class TicketCard extends Component {
    static propTypes = {
        ticket: PropTypes.object,
        users: PropTypes.array,
        peer: PropTypes.object,
        ticketsType: PropTypes.string,
        pushState: PropTypes.func,
        requestUserCloseTicket: PropTypes.func,
        requestAdminCloseTicket: PropTypes.func,
        closeTicket: PropTypes.func,
        delegateTicket: PropTypes.func
    };

    state = {
        closeTicketDialogActive: false,
        delegateTicketDialogActive: false
    };

    render() {
        const {ticket, users, peer, closeTicket, delegateTicket} = this.props;

        return (
            <section className={cx('ticket-header')}>
                <div className={cx('ticket-info')}>
                    <div className={cx('ticket-peer')}>
                        <span className={cx('ticket-peer-name')}>
                            {peer.firstName} {peer.lastName}
                        </span>
                        <span className={cx('ticket-peer-channel')}>
                            {ticket.channel ? ticket.channel.name : ''}
                        </span>
                    </div>

                    <ButtonToolbar className={cx('actions')}>
                        {ticket.state !== 'closed' &&
                        <DropdownButton id="close-ticket" bsSize="small" title="Close" onSelect={::this.closeAction}>
                            <MenuItem eventKey="request_user_close_ticket">Request user close ticket</MenuItem>
                            <MenuItem eventKey="request_admin_close_ticket">Request admin close ticket</MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="close_ticket">Force close ticket</MenuItem>
                        </DropdownButton>
                        }

                        {ticket.state !== 'closed' &&
                        <Button className={cx('delegate')} bsSize="small" onClick={::this.delegateAction}>
                            Delegate
                        </Button>
                        }

                        {ticket.state === 'closed' &&
                        <Button className={cx('reopen')} bsSize="small" onClick={::this.reopenAction}>
                            Reopen
                        </Button>
                        }
                    </ButtonToolbar>

                </div>

                <div className={cx('ticket-status')}>
                    <div className={cx('ticket-state', ticket.state)}>{ticket.state}</div>
                    <div className={cx('ticket-assigned')}>
                        { ticket.assignedTo
                            ? <div>Assigned to <span
                            className={cx('ticket-assigned-name')}>{ticket.assignedTo.name}</span></div>
                            : 'Unassigned'
                        }
                    </div>
                </div>

                <CloseTicketModal
                    ticket={ticket}
                    closeTicket={closeTicket}
                    active={this.state.closeTicketDialogActive}
                    toggleCloseTicketDialog={::this.toggleCloseTicketDialog}
                />

                <DelegateTicketModal
                    ticket={ticket}
                    users={users}
                    delegateTicket={delegateTicket}
                    redirectToList={::this.redirectToList}
                    active={this.state.delegateTicketDialogActive}
                    toggleDelegateTicketDialog={::this.toggleDelegateTicketDialog}
                />

            </section>
        );
    }

    toggleCloseTicketDialog = () => {
        this.setState({closeTicketDialogActive: !this.state.closeTicketDialogActive});
    };

    toggleDelegateTicketDialog = () => {
        this.setState({delegateTicketDialogActive: !this.state.delegateTicketDialogActive});
    };

    closeAction(key) {
        const {ticket, requestUserCloseTicket, requestAdminCloseTicket} = this.props;

        switch (key) {
        case 'request_user_close_ticket':
            requestUserCloseTicket(ticket._id);
            return;
        case 'request_admin_close_ticket':
            requestAdminCloseTicket(ticket._id);
            return;
        case 'close_ticket':
            this.toggleCloseTicketDialog();
            return;
        }
    }

    delegateAction() {
        this.toggleDelegateTicketDialog();
    }

    reopenAction() {

    }

    redirectToList() {
        return this.props.pushState(null, '/tickets/' + this.props.ticketsType);
    }
}

