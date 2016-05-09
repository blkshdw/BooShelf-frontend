import React, { Component, PropTypes } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import { formatDate } from 'utils/date';
import { Glyphicon } from 'react-bootstrap';
import ImageLoader from 'react-imageloader';
import { emojify } from 'react-emojione';
import selectn from 'selectn';
import config from 'config';
import cx from './TicketMessage.styl';

const emojiOptions = {
    convertShortnames: true,
    convertUnicode: true,
    convertAscii: true,
    styles: {
        backgroundImage: 'url(../icons/emojione.sprites.png)',
    }
};

export default class TicketMessage extends Component {
    static propTypes = {
        message: PropTypes.object,
        ticket: PropTypes.object,
        peer: PropTypes.object,
        markMessageAsRead: PropTypes.func
    }

    state = {
        visible: false
    }

    render() {
        const { ticket, message, peer } = this.props;
        const isSupport = peer.__typename === 'User';
        let name = '';
        if (isSupport) {
            name = peer.name;
        } else {
            name = peer.firstName + ' ' + peer.lastName;
        }

        let readMessage = message.from.__typename === 'User' ? message.readByPeer : message.read;

        return (
            <div className={cx('message', {'message-unread': !readMessage})} key={message._id}>
                <VisibilitySensor onChange={::this.componentVisibilityChanged} />

                <div className={cx('message-info')}>
                    <span className={cx('message-author')}>{name}</span>
                    <span className={cx('message-date')}> - {formatDate(message.date)}</span>
                </div>
                <div className={cx('message-content')}>
                    {message.content && emojify(message.content, emojiOptions) || message.content}
                    {message.attachments && message.attachments.map(attach => this.renderAttach(attach))}
                </div>
            </div>
        );
    }

    renderAttach(attach) {
        let element = '';

        if (attach.__typename === 'AttachmentPhoto') {
            element = (
                <ImageLoader preloader={::this.preloader} src={config.storageUrl + attach.object} />
            )
        } else if (attach.__typename === 'AttachmentVideo') {
            element = (
                <video controls="controls">
                    <source src={config.storageUrl + attach.object} />
                    <a href={config.storageUrl + attach.object} target="blank">Download</a>
                </video>
            );
        } else if (attach.__typename === 'AttachmentDocument') {
                element = (
                    <a href={config.storageUrl + attach.object} target="blank">Download</a>
                );
        } else if (attach.__typename === 'AttachmentSticker') {
            element = (
                <ImageLoader preloader={::this.preloader} src={config.storageUrl + attach.object} />
            );
        } else if (attach.__typename === 'AttachmentAudio' || attach.__typename === 'AttachmentVoice') {
            element = (
                <audio controls>
                    <source src={config.storageUrl + attach.object}>
                        <source src={config.storageUrl + attach.object} >
                            <a href={config.storageUrl + attach.object}>Download</a>
                        </source>
                    </source>
                </audio>
            )
        }

        return (
            <div key={attach._id}>
                {element}
            </div>
        )
    }

    preloader() {
        return <div className={cx('preloader')} style={{height: 200}} />;
    }

    componentVisibilityChanged(visible) {
        if (visible && !this.props.message.read) {
            this.props.markMessageAsRead(this.props.message._id);
        }
    }


}