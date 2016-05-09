import { isEmpty, last } from 'lodash';
import React, { Component, PropTypes } from 'react';
import config from 'config';
import WidgetTicketList from './WidgetTicketList';
import cx from './TicketsList.styl';

export default class TicketsList extends Component {
    static propTypes = {
        tickets: PropTypes.array,
        ticket: PropTypes.object,
        peers: PropTypes.object,
        messages: PropTypes.object,
        ticketsType: PropTypes.string,
        goToTicketCard: PropTypes.func,
        requestTicket: PropTypes.func,
        unreadMessagesCount: PropTypes.object
    }

    render() {
        const { tickets, ticketsType, requestTicket } = this.props;

        return (
            <div className={cx('tickets-list-wrapper')}>
                <div className={cx('list-group', 'tickets-list')}>
                    {tickets.map(ticket => this.renderTicket(ticket))}
                    {ticketsType === 'mine' &&
                        <button type="button" onClick={requestTicket} className={cx('list-group-item', 'request-ticket')}>
                            Request new ticket
                        </button>
                    }
                </div>
            </div>
        );
    }

    renderTicket(ticket) {
        const { goToTicketCard, messages, unreadMessagesCounts, peers } = this.props;
        const activeTicket = this.props.ticket;

        const messageId = !isEmpty(ticket.messages) && last(ticket.messages);
        const message = messages[messageId];
        const author = peers[message.from];
        const peer = peers[ticket.chat];

        if (message) {
            const name = (peer.firstName || '') + ' ' + (peer.lastName || '');
            const photo = config.storageUrl + peer.photoObject;
            const authorName = author.name || author.firstName || '';
            const ticketName = ticket.channel ? ticket.channel.name || ticket.channel._id : '';

            return (
                <WidgetTicketList
                    to={goToTicketCard(ticket._id)}
                    photo={photo}
                    name={name}
                    author={authorName}
                    message={ message && message.content }
                    date={ticket.date}
                    key={ticket._id}
                    ticketName={ticketName}
                    unreadMessagesCount={unreadMessagesCounts[ticket._id]}
                    isActive={activeTicket && ticket._id === activeTicket._id}
                />
          );
        } else {
            return null;
        }

    }


}
