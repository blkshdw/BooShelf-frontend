import { isEmpty, last } from 'lodash';
import Avatar from 'react-avatar';
import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import cx from './userCardHeader.styl';
import moment from 'moment';
import WidgetUserEdit from './WidgetUserEdit';

export default class UserCardHeader extends Component {
    static propTypes = {
        user: PropTypes.object,
        editable: PropTypes.bool,
        updateUser: PropTypes.func
    }

    state = {
        updateUserDialogActive: false
    }

    render() {
        const {user, updateUser, editable} = this.props;

        return (
            <div className={cx('usercard-header', 'box-row')}>
                    <div className="">
                        <h2 className="">{user.fullName || user.username} {editable && <Button className={cx('edit-button')} onClick={::this.toggleUpdateUserDialog} >Edit</Button>}<WidgetUserEdit
                            active={this.state.updateUserDialogActive}
                            updateUser={updateUser}
                            fullName={user.fullName}
                            about={user.about}
                            birthdayDate={user.birthdayDate}
                            toggleCreateUserDialog={::this.toggleUpdateUserDialog}
                        /></h2>
                        <div className={cx('birthday')} >
                            {user.birthdayDate ? moment().diff(user.birthdayDate, 'years' + "years old")  : 'Birth date not stated'}
                        </div>
                        <div className={cx('about')} >
                            {user.about}
                        </div>
                        <br />
                    </div>
                    <div className="col-sm-2"><a className="pull-right"><Avatar name={user.fullName || user.username}/></a>
                        </div>
            </div>
        );
    }

    toggleUpdateUserDialog() {
        this.setState({updateUserDialogActive: !this.state.updateUserDialogActive});
    }
}