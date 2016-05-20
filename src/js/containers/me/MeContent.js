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
        updateProfile: PropTypes.func
    }

    render() {

        const { user, children, updateProfile } = this.props;
        console.log(children);
        return (
            <div  className={cx('box-col')}>
                <UserCardHeader updateUser={updateProfile} user={user} editable/>
                <div className={cx('me-container')}>
                    <UserCardNavigation />
                    {children}
                </div>
            </div>
        )

    }
}