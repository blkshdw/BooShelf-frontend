import React, { Component, PropTypes } from 'react';
import { UserCardHeader, UserCardNavigation } from 'components/users';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { pushState } from 'redux-router';
import Loader from 'components/Loader';
import { userCardSelector } from 'selectors';
import cx from './UserCardContent.styl';
import WidgetUserDialog from 'components/WidgetUserDialog';
import { fetchUser, fetchUserTrackings } from 'actions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUser,
        fetchUserTrackings,
        pushState
    }, dispatch);
}

@connect(userCardSelector, mapDispatchToProps)
export default class UserCardContent extends Component {
    static PropTypes = {
        user: PropTypes.object,
        userId: PropTypes.string,
        fetchUserTrackings: PropTypes.func,
        children: PropTypes.node.isRequired
    }

    componentWillMount() {
        if (this.props.isMe) {
            this.props.pushState(null, '/me');
        }
        this.props.fetchUser(this.props.userId);
        this.props.fetchUserTrackings(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isMe) {
            this.props.pushState(null, '/me');
        }
        if (nextProps.userId !== this.props.userId) {
            this.props.fetchUser(this.props.userId);
            this.props.fetchUserTrackings(this.props.userId);
        }
    }

    render() {

        const { user, children } = this.props;
        if (!user) {
            return <Loader />
        }
        return (
            <div  className={cx('box-col')}>
                <UserCardHeader user={user} />
                <div className={cx('me-container')}>
                    <UserCardNavigation user={user} />
                    {children}
                </div>
            </div>
        )

    }
}