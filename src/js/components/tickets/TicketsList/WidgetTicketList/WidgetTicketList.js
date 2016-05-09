import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { emojify } from 'react-emojione';
import moment from 'moment';
import cx from './WidgetTicketList.styl';

const emojiOptions = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(../icons/emojione.sprites.png)'
    }
};

export default class WidgetTicketList extends Component {

    static propTypes = {
        author: PropTypes.string,
        isActive: PropTypes.bool,
        to: PropTypes.string,
        photo: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        message: PropTypes.string,
        date: PropTypes.number,
        ticketName: PropTypes.string,
        unreadMessagesCount: PropTypes.number,
        messagesCount: PropTypes.number
    };

    static defaultProps = {
        author: null,
        isActive0: false,
        className: '',
        photo: 'http://lorempixel.com/40/40/',
        name: 'Rick Morfius',
        message: 'Hello! Lorem impsum!',
        ticketName: '',
        date: new Date()
    };

    render () {
        const {author, isActive, to, photo, name, message, unreadMessagesCount, date, ticketName, className} = this.props;

        return (
            <Link to={to} className={cx(className, 'list-group-item', 'ticket', { 'active': isActive, 'ticket-active': isActive })} activeClassName="active">
                <img className={cx('', 'avatar')} src={photo} />

                <div className={cx('', 'info')}>
                    <div className={cx('', 'line')}>
                        <div className={cx('', 'peer')}>
                            <div className={cx('', 'name')}>
                                {name}
                            </div>
                            <div className={cx('', 'channel')}>
                                From: {ticketName}
                            </div>
                        </div>
                        <div  className={cx('', 'datetime')}>{moment(date).format('HH:mm A')}</div>
                    </div>

                    <div className={cx('', 'line')}>
                        <div className={cx('', 'message')}>{author && author.concat(': ')}{message ? emojify(message, emojiOptions) : message}</div>
                        {unreadMessagesCount > 0 &&
                            <div className={cx('', 'new-messages-count')}>{unreadMessagesCount}</div>
                        }
                    </div>
                </div>
            </Link>
        );
    };
}
