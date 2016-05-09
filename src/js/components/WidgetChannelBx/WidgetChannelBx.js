import React, {Component, PropTypes} from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import cx from './WidgetChannelBx.styl';

import TelegramBotChannelPicture from './telegram.png';
import VkChannelPicture from './vkontakte.png';

export default class WidgetChannelBx extends Component {
    static propTypes = {
        className: PropTypes.string,
        channelId: PropTypes.string,
        type: PropTypes.string,
        contact: PropTypes.string, // @TODO rename to something more readable
        state: PropTypes.string,
        enableChannel: PropTypes.func,
        disableChannel: PropTypes.func,
        removeChannel: PropTypes.func
    };

    static defaultProps = {
        className: '',
        type: undefined,
        contact: 'No name',
        state: ''
    };

    render() {
        const {type, contact, state, className} = this.props;

        const pictures = {
            TelegramBotChannel: TelegramBotChannelPicture,
            VkChannel: VkChannelPicture
        };

        const titles = {
            TelegramBotChannel: 'Telegram Bot',
            VkChannel: 'Vkontakte'
        };

        const links = {
            TelegramBotChannel: 'http://telegram.me/' + contact
        };

        return (
            <div className={cx(className, 'channel')}>
                <div className={cx('info')}>
                    <img className={cx('picture')} src={pictures[type]}/>
                    <div className={cx('links')}>
                        {links[type]
                            ? <a className={cx('name')} href={links[type]} target="blank">{contact}</a>
                            : <div className={cx('name')}>{contact}</div>
                        }

                        {links[type]
                            ? <a className={cx('type')} href={links[type]} target="blank">{titles[type]}</a>
                            : <div className={cx('type')}>{titles[type]}</div>
                        }
                    </div>
                </div>
                <ButtonToolbar className={cx('actions')}>
                    {state === 'enabled' &&
                        <Button bsStyle="danger" onClick={::this.disable}>Disable</Button>
                    }

                    {state === 'disabled' &&
                        <Button bsStyle="danger" onClick={::this.remove}>Remove</Button>
                    }
                    {state === 'disabled' &&
                        <Button bsStyle="primary" onClick={::this.enable}>Enable</Button>
                    }
                </ButtonToolbar>
            </div>
        );
    }

    disable() {
        this.props.disableChannel(this.props.channelId);
    }

    enable() {
        this.props.enableChannel(this.props.channelId);
    }

    remove() {
        this.props.removeChannel(this.props.channelId);
    }
}
