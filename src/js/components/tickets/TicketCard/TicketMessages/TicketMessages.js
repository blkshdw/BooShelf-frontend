import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { last } from 'lodash';
import ReactDOM from 'react-dom';
import cx from './TicketMessages.styl';
import TicketMessage from './TicketMessage';

export default class TicketMessages extends Component {
    static propTypes = {
        ticket: PropTypes.object,
        messages: PropTypes.object,
        peers: PropTypes.object,
        setScrollPosition: PropTypes.func,
        scrollPositions: PropTypes.object,
        markMessageAsRead: PropTypes.func
    }

    state = {
        newScrollPosition: null
    }

    componentWillUpdate(nextProps) {
        let node = ReactDOM.findDOMNode(this);
        if (nextProps.ticket._id !== this.props.ticket._id) {
            let newScrollPosition = nextProps.scrollPositions[nextProps.ticket._id];
            if (newScrollPosition || newScrollPosition === 0) {
                this.setState({newScrollPosition: newScrollPosition});
            } else {
                this.setState({newScrollPosition: ''});
            }
            this.props.setScrollPosition(this.props.ticket._id, node.scrollTop);
        } else if (nextProps.ticket.messages !== this.props.ticket.messages) {
            this.setState({newScrollPosition: ''});
        }
    }

    componentDidUpdate() {
        let node = ReactDOM.findDOMNode(this);
        let { newScrollPosition } = this.state;
        if (newScrollPosition || newScrollPosition === 0) {
            node.scrollTop = newScrollPosition;
            this.setState({newScrollPosition: null});
        } else if (newScrollPosition !== null) {
            node.scrollTop = node.scrollHeight;
        }
        const { ticket, messages } = this.props;
        const lastId = last(ticket.messages);
    }

    componentDidMount() {
        const node = ReactDOM.findDOMNode(this);
        const newScrollPosition = this.props.scrollPositions[this.props.ticket._id];
        if (newScrollPosition || newScrollPosition === 0) {
            node.scrollTop = newScrollPosition;
            this.setState({newScrollPosition: null});
        } else {
            node.scrollTop = node.scrollHeight;
        }
        const { ticket, messages } = this.props;
        const lastId = last(ticket.messages);
    }

    componentWillUnmount() {
        const node = ReactDOM.findDOMNode(this);
        this.props.setScrollPosition(this.props.ticket._id, node.scrollTop);
    }

    render() {
        const { ticket, messages, markMessageAsRead, peers } = this.props;

        return (
            <section className={cx('ticket-messages')}>
                {ticket.messages &&
                    ticket.messages.map(id => messages[id] &&
                        <TicketMessage
                            markMessageAsRead={markMessageAsRead}
                            key={id}
                            message={messages[id]}
                            peer={peers[messages[id].from]}
                            ticket={ticket}
                        />
                    )
                }
            </section>
        );
    }

}