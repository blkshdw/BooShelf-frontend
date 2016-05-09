import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { channelsListSelector } from 'selectors';
import { pushState } from 'redux-router';
import { ChannelsShow } from 'components/channels';
import Loader from 'components/Loader';
import {Button} from 'react-bootstrap';
import WidgetChannelDialog from 'components/WidgetChannelDialog';
import {
    createChannel,
    fetchChannels,
    enableChannel,
    disableChannel,
    removeChannel,
} from 'actions';
import cx from './ChannelsContent.styl';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        pushState,
        fetchChannels,
        enableChannel,
        disableChannel,
        removeChannel,
        createChannel
    }, dispatch);
}

@connect(channelsListSelector, mapDispatchToProps)
export default class ChannelsContent extends Component {
    static propTypes = {
        createChannel: PropTypes.func,
        enableChannel: PropTypes.func,
        disableChannel: PropTypes.func,
        removeChannel: PropTypes.func,
        pushState: PropTypes.func,
        enabledChannels: PropTypes.array,
        disabledChannels: PropTypes.array,
        isFetching: PropTypes.bool,
        fetchChannels: PropTypes.func
    };

    state = {
        createChannelModalVisible: false
    };

    componentWillMount() {
        this.props.fetchChannels();
    }


    render() {
        const { enabledChannels, disabledChannels, isFetching, ...actions} = this.props;

        if (isFetching) {
            return (<Loader />);
        } else {
            return (
                <section className={cx('box-col nowrap no-overflow', 'channels-content')}>
                    <section className={cx('box-col nowrap', 'content')}>
                        <h5>Active channels</h5>
                        <p>Those channels are listened to.</p>

                        <ChannelsShow
                            channels={enabledChannels}
                            enableChannel={actions.enableChannel}
                            disableChannel={actions.disableChannel}
                            removeChannel={actions.removeChannel}
                        />

                        <Button bsStyle="primary" onClick={::this.toggleCreateChannelModal}>
                            Create channel
                        </Button>

                        <WidgetChannelDialog
                            active={this.state.createChannelModalVisible}
                            toggle={::this.toggleCreateChannelModal}
                            createChannel={actions.createChannel}
                        />

                        <h5>Disabled channels</h5>
                        <p>Those channels are disabled and not being listened to.</p>
                        <ChannelsShow
                            channels={disabledChannels}
                            enableChannel={actions.enableChannel}
                            disableChannel={actions.disableChannel}
                            removeChannel={actions.removeChannel}
                        />
                    </section>
                </section>
            );
        }
    }

    toggleCreateChannelModal() {
        this.setState({createChannelModalVisible: !this.state.createChannelModalVisible})
    }
}

