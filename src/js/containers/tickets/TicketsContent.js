import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { bindActionCreators } from 'redux';
import { ticketsListSelector } from 'selectors';
import { fetchTickets, fetchTicket, sendMessage, requestTicket, requestUserCloseTicket, requestAdminCloseTicket, closeTicket, delegateTicket, uploadAttachments, setScrollPosition, initDraftMessage, saveDraftMessage, removeAttachment, markMessageAsRead } from 'actions';
import { TicketsList, TicketCard } from 'components/tickets';
import Loader from 'components/Loader';
import selectn from 'selectn';
import cx from './TicketsContent.styl';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        pushState,
        fetchTickets,
        fetchTicket,
        requestTicket,
        requestUserCloseTicket,
        requestAdminCloseTicket,
        closeTicket,
        delegateTicket,
        sendMessage,
        uploadAttachments,
        setScrollPosition,
        initDraftMessage,
        saveDraftMessage,
        removeAttachment,
        markMessageAsRead
    }, dispatch);
}

@connect(ticketsListSelector, mapDispatchToProps)
export default class TicketsContent extends Component {
    static propTypes = {
        tickets: PropTypes.array,
        users: PropTypes.array,
        peers: PropTypes.object,
        messages: PropTypes.object,
        ticket: PropTypes.object,
        ticketId: PropTypes.string,
        ticketsType: PropTypes.string,
        isFetching: PropTypes.bool,
        params: PropTypes.object,
        location: PropTypes.object,
        sendMessage: PropTypes.func,
        fetchTickets: PropTypes.func,
        fetchTicket: PropTypes.func,
        pushState: PropTypes.func,
        requestTicket: PropTypes.func,
        requestUserCloseTicket: PropTypes.func,
        requestAdminCloseTicket: PropTypes.func,
        closeTicket: PropTypes.func,
        delegateTicket: PropTypes.func,
        uploadAttachments: PropTypes.func,
        setScrollPosition: PropTypes.func,
        scrollPositions: PropTypes.object.isRequired,
        draftMessage: PropTypes.object,
        initDraftMessage: PropTypes.func,
        saveDraftMessage: PropTypes.func,
        removeAttachment: PropTypes.func,
        markMessageAsRead: PropTypes.func,
        unreadMessagesCounts: PropTypes.object
    }

    componentWillMount() {
        this.props.fetchTickets(this.props.ticketsType);

        if (this.props.ticketId) {
            this.props.fetchTicket(this.props.ticketId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.ticketsType !== nextProps.ticketsType) {
            this.props.fetchTickets(nextProps.ticketsType);
            if (this.props.ticketId) {
                this.props.fetchTicket(this.props.ticketId);
            }
        }
    }

    render() {
        const { tickets, users, messages, ticketsType, ticket, unreadMessagesCounts, isFetching, peers, scrollPositions, draftMessage, ...actions } = this.props;
        if (isFetching) {
            return <Loader/>;
        }

        return (
            <div className={cx('tickets')}>
                <TicketsList
                    tickets={tickets}
                    ticket={ticket}
                    messages={messages}
                    ticketsType={ticketsType}
                    goToTicketCard={this.goToTicketCard}
                    peers={peers}
                    requestTicket={actions.requestTicket}
                    unreadMessagesCounts={unreadMessagesCounts}
                />
                <TicketCard
                    ticket={ticket}
                    users={users}
                    messages={messages}
                    pushState={actions.pushState}
                    ticketsType={ticketsType}
                    onMessageSend={actions.sendMessage}
                    peers={peers}
                    requestUserCloseTicket={actions.requestUserCloseTicket}
                    requestAdminCloseTicket={actions.requestAdminCloseTicket}
                    closeTicket={actions.closeTicket}
                    delegateTicket={actions.delegateTicket}
                    setScrollPosition={actions.setScrollPosition}
                    scrollPositions={scrollPositions}
                    uploadAttachments={actions.uploadAttachments}
                    draftMessage={draftMessage}
                    initDraftMessage={actions.initDraftMessage}
                    saveDraftMessage={actions.saveDraftMessage}
                    removeAttachment={actions.removeAttachment}
                    markMessageAsRead={actions.markMessageAsRead}
                />
            </div>
        );
    }

    goToTicketCard = ticketId => {
        const ticketsType = selectn('ticketsType', this.props.params) || '';
        return '/tickets/' + ticketsType + '?id=' + ticketId;
    }
}
