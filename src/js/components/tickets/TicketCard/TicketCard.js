import React, {Component, PropTypes} from 'react';
import TicketHeader from './TicketHeader';
import TicketMessages from './TicketMessages';
import TicketSendPanel from './TicketSendPanel';
import cx from './TicketCard.styl';

export default class TicketCard extends Component {
    static propTypes = {
        ticket: PropTypes.object,
        users: PropTypes.array,
        peers: PropTypes.object,
        messages: PropTypes.object,
        ticketsType: PropTypes.string,
        pushState: PropTypes.func,
        onMessageSend: PropTypes.func,
        requestUserCloseTicket: PropTypes.func,
        requestAdminCloseTicket: PropTypes.func,
        closeTicket: PropTypes.func,
        delegateTicket: PropTypes.func,
        uploadAttachments: PropTypes.func,
        setScrollPosition: PropTypes.func,
        scrollPositions: PropTypes.object,
        draftMessage: PropTypes.object,
        initDraftMessage: PropTypes.func,
        saveDraftMessage: PropTypes.func,
        markMessageAsRead: PropTypes.func
    }

    render() {
        const {ticket, users, messages, ticketsType, onMessageSend, requestUserCloseTicket, requestAdminCloseTicket, peers, closeTicket, delegateTicket, scrollPositions, draftMessage, ...actions} = this.props;

        if (ticket) {
            return (
                <div className={cx('layout')}>
                    <TicketHeader
                        className={cx('header')}
                        ticket={ticket}
                        peer={peers[ticket.chat]}
                        users={users}
                        pushState={actions.pushState}
                        ticketsType={ticketsType}
                        requestUserCloseTicket={requestUserCloseTicket}
                        requestAdminCloseTicket={requestAdminCloseTicket}
                        closeTicket={closeTicket}
                        delegateTicket={delegateTicket}
                    />
                    <TicketMessages
                        className={cx('messages')}
                        ticket={ticket}
                        peers={peers}
                        messages={messages}
                        setScrollPosition={actions.setScrollPosition}
                        scrollPositions={scrollPositions}
                        markMessageAsRead={actions.markMessageAsRead}
                    />
                    <TicketSendPanel
                        className={cx('send-panel')}
                        ticket={ticket}
                        draftMessage={draftMessage}
                        onMessageSend={onMessageSend}
                        uploadAttachments={actions.uploadAttachments}
                        initDraftMessage={actions.initDraftMessage}
                        saveDraftMessage={actions.saveDraftMessage}
                        removeAttachment={actions.removeAttachment}
                    />
                </div>
            );
        } else {
            return (
                <div className={cx('box-col nowrap align-middle', 'ticket-card')}>
                    <p>Choose ticket {ticketsType === 'mine' && 'or request new one'}</p>
                </div>
            );
        }
    }
}

