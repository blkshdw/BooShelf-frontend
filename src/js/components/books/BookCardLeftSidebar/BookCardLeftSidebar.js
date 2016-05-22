import { isEmpty, last } from 'lodash';
import Avatar from 'react-avatar';
import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import ButtonPrimary from 'components/ButtonPrimary';
import cx from './BookCardLeftSidebar.styl';

export default class UserCardHeader extends Component {
    static propTypes = {
        book: PropTypes.object,
        editable: PropTypes.bool
    }

    state = {
        updateUserDialogActive: false
    }

    render() {
        const {book} = this.props;

        return (
            
            <div className={cx('bookcard-sidebar')}>

            </div>

        );
    }

    toggleUpdateUserDialog() {
        this.setState({updateUserDialogActive: !this.state.updateUserDialogActive});
    }
}



