import React, { Component, PropTypes } from 'react';
import { FontIcon, IconButton } from 'react-toolbox';
import { Modifier, ContentState, EditorState } from 'draft-js';
import { DropdownButton, MenuItem, Glyphicon, Dropdown, Button } from 'react-bootstrap';
import { List, ListSubHeader, ListItem } from 'react-toolbox';
import Dropzone from 'react-dropzone';
import { debounce } from 'utils/decorators';
import DRAFT_MESSAGE_SAVE_TIME from 'constants/Common';
import TextEditor from 'components/TextEditor';
import config from 'config';
import cx from './TicketSendPanel.styl';

export default class TicketSendPanel extends Component {
    static propTypes = {
        ticket: PropTypes.object,
        onMessageSend: PropTypes.func,
        uploadAttachments: PropTypes.func,
        draftMessage: PropTypes.object,
        initDraftMessage: PropTypes.func,
        saveDraftMessage: PropTypes.func,
        removeAttachment: PropTypes.func
    }

    state = {
        fileType: ''
    }

    handleOnEnter = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            return this.handleMessageSubmit();
        }
    }

    componentWillMount() {
        this.props.initDraftMessage(this.props.ticket._id);
    }

    componentWillUpdate(nextProps) {
        const { message } = this.refs;
        if (message) {
            if (nextProps.ticket._id !== this.props.ticket._id) {
                this.props.saveDraftMessage({
                    ticket: this.props.ticket._id,
                    content: message.value,
                    attachments: this.props.draftMessage ? this.props.draftMessage.attachments : []
                });
                nextProps.initDraftMessage(nextProps.ticket._id);
            }
        }

    }

    render() {
        const { ticket, draftMessage, removeAttachment } = this.props;
        const attachments = draftMessage ? draftMessage.attachments : [];
        const content = draftMessage ? draftMessage.content : '';
        return (
            <div className={cx('box-row vertical-align', 'ticket-send-panel')}>
                <Dropzone ref="PhotoDropzone" style={{ display: 'none' }} onDrop={::this.onDrop} accept="image/*" />
                <Dropzone ref="DocumentDropzone" style={{ display: 'none' }} onDrop={::this.onDrop} />

                <div className={cx('attach')}>
                    <DropdownButton bsSize="small" id="attach" title="Attach" onSelect={::this.menuSelect} dropup>
                        <MenuItem eventKey="document">
                            <Glyphicon glyph="file" />
                            Document
                        </MenuItem>
                        <MenuItem eventKey="photo">
                            <Glyphicon glyph="picture"/>
                            Photo
                        </MenuItem>
                    </DropdownButton>
                </div>
                <TextEditor ref="message" value={content} onReturn={::this.handleOnEnter} />
                <Button bsStyle="primary" bsSize="small"  className={cx('send')} onClick={this.handleMessageSubmit}>
                    Send
                </Button>
                {attachments.length > 0 && <List ripple className={cx('related-files')}>
                    <ListSubHeader caption="Related files"/>
                    {attachments.map(attachment => {
                        if (attachment.__typename === 'AttachmentPhoto') {
                            return (
                                <div className={cx('box-row', 'attach-file')} key={attachment._id}>
                                    <ListItem
                                        key={attachment._id}
                                        caption={attachment.name}
                                        avatar={config.storageUrl + attachment.object}
                                    />
                                    <FontIcon className={cx('delete-btn')} value="delete" onClick={() => removeAttachment(attachment, ticket._id)}/>
                                </div>);
                        } else {
                            return (
                                <div className={cx('box-row', 'attach-file')} key={attachment._id}>
                                    <ListItem
                                        leftIcon="attachment"
                                        key={attachment._id}
                                        caption={attachment.name}
                                    />
                                    <FontIcon className={cx('delete-btn')} value="delete" onClick={() => removeAttachment(attachment, ticket._id)}/>
                                </div>
                            );
                        }
                    })}
                </List>
                }
            </div>
        );
    }

    handleMessageSubmit = (cb) => {
        const { message } = this.refs;
        const value = message.value.replace(/^\s+/, '').replace(/\s+$/, '');
        if (value !== '') {
            const { ticket } = this.props;
            const attachments = [];
            this.props.draftMessage.attachments.forEach(attachment => {
                attachments.push(attachment._id);
            });
            this.props.onMessageSend({
                ticket: ticket._id,
                content: message.value
            }, attachments);
        }
        return typeof cb === 'function' ? cb() : true;
    }

    onDrop(files) {
        this.setState({
            files: files
        });
        this.props.uploadAttachments(files, this.props.ticket._id, this.state.fileType);
    }       

    onOpenClick() {
        this.refs.dropzone.open();
    }

    @debounce(DRAFT_MESSAGE_SAVE_TIME)
    saveDraftMessage(draftMessage) {
        this.props.saveDraftMessage(draftMessage);
    }

    menuSelect(value) {
        console.log(value);
        this.setState({fileType: value});
        switch (value) {
        case 'document':
            this.refs.DocumentDropzone.open();
            return;
        case 'photo':
            this.refs.PhotoDropzone.open();
            return;
        default:
            return;
        }
    }
}

