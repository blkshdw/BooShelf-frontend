import { isEmpty, last } from 'lodash';
import Avatar from 'react-avatar';
import { SketchPicker } from 'react-color';
import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import cx from './userCardHeader.styl';
import moment from 'moment';
import { debounce } from  'utils/decorators';
import WidgetUserEdit from './WidgetUserEdit';

export default class UserCardHeader extends Component {
    static propTypes = {
        user: PropTypes.object,
        editable: PropTypes.bool,
        updateUser: PropTypes.func
    }

    state = {
        updateUserDialogActive: false,
        colorPickerVisible: false
    }

    render() {
        const {user, updateUser, editable, isUpdating, error} = this.props;

        return (
            <div className={cx('usercard-header', 'box-row')}>
                    <div className="">
                        <h2 className="">{user.fullName || user.username} {editable && <Button className={cx('edit-button')} onClick={::this.toggleUpdateUserDialog} >Edit</Button>}
                            {this.state.updateUserDialogActive ? <WidgetUserEdit
                            active={this.state.updateUserDialogActive}
                            updateUser={updateUser}
                            isUpdating={isUpdating}
                            error={error}
                            fullName={user.fullName}
                            about={user.about}
                            birthdayDate={user.birthdayDate}
                            toggleCreateUserDialog={::this.toggleUpdateUserDialog}
                        /> : ''}</h2>
                        <div className={cx('birthday')} >
                            {user.birthdayDate ? moment().diff(user.birthdayDate, 'years') + " years old"  : 'Birthday not stated'}
                        </div>
                        <div className={cx('about')} >
                            {user.about}
                        </div>
                        <br />
                    </div>
                    <div  className="col-sm-2"><a className="pull-right"><Avatar color={user.color} name={user.fullName || user.username}/></a>
                        {editable &&
                        <Button onClick={() => this.setState({colorPickerVisible: !this.state.colorPickerVisible})}
                                className={cx('color-btn')} bsSize="xsmall">Change color</Button> }
                        {this.state.colorPickerVisible ? <div className={cx('color-picker')}> <SketchPicker onChangeComplete={::this.handleChangeColor} color={user.color}/> </div> : ''}
                        </div>
            </div>
        );
    }

    toggleUpdateUserDialog() {
        this.setState({updateUserDialogActive: !this.state.updateUserDialogActive});
    }

    @debounce(500)
    handleChangeColor(color){
        this.props.updateUser({
            color: color.hex
        })
    }


}