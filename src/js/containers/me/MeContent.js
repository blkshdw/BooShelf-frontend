import React, { Component, PropTypes } from 'react';
import { UserCardHeader, UserCardNavigation } from 'components/users';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { myProfileSelector } from 'selectors';
import WidgetUserDialog from 'components/WidgetUserDialog';
import cx from './MeContent.styl';
import { updateProfile } from 'actions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateProfile
    }, dispatch);
}

@connect(myProfileSelector, mapDispatchToProps)
export default class MeContent extends Component {
    static PropTypes = {
        user: PropTypes.object,
        children: PropTypes.node.isRequired,
        updateProfile: PropTypes.func,
        isUpdating: PropTypes.bool,
        error: PropTypes.string
    }

    render() {

        const { user, children, updateProfile, isUpdating, error } = this.props;
        return (
            <div  className={cx('box-col')}>
                <UserCardHeader updateUser={updateProfile} isUpdating={isUpdating} error={error} user={user} editable/>
                <div className={cx('me-container')}>
                    <UserCardNavigation isMe />
                    {children}
                </div>
            </div>
        )

    }
}