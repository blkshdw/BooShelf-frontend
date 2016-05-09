import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { Link } from 'react-router';
import WidgetChannelBx from './../WidgetChannelBx';


export default class ChannelsShow extends Component {
    static propTypes = {
        channels: PropTypes.array,
        enableChannel: PropTypes.func,
        disableChannel: PropTypes.func,
        removeChannel: PropTypes.func,
    }

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        const { channels } = this.props;

        return (
            <div className="box-row">
                {channels.map(channel => this.renderChannel(channel))}
            </div>
        );
    }

    renderChannel(channel) {
        const { enableChannel, disableChannel, removeChannel } = this.props;

        return (
            <WidgetChannelBx
                type={channel.__typename}
                state={channel.state}
                contact={channel.phoneNumber || channel.username || channel.name}
                key={channel._id}
                enableChannel={enableChannel}
                disableChannel={disableChannel}
                removeChannel={removeChannel}
                channelId={channel._id}
            />
        );
    }


}
