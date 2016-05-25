import { isEmpty, last } from 'lodash';
import Avatar from 'react-avatar';
import React, { Component, PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import ButtonPrimary from 'components/ButtonPrimary';
import cx from './UserCardNavigation.styl';

export default class UserCardHeader extends Component {
    static propTypes = {
        user: PropTypes.object,
        editable: PropTypes.bool
    }

    state = {
        updateUserDialogActive: false
    }

    render() {
        const {user, isMe} = this.props;

        return (
            
            <div className={cx('usercard-navigation')}>
                <ul className={cx('main-menu', 'nav nav-stacked affix')}>
                    <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to={isMe ? `/me/reviews` : `/users/${user.id}/reviews`}>Reviews</ButtonPrimary></li>
                    <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to={isMe ? '/me/books/all' : `/users/${user.id}/books/all`}>Books</ButtonPrimary>
                        <ul className={cx('sub-menu')}>
                            <div className="no-decoration"><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to={isMe ? '/me/books/toRead' : `/users/${user.id}/books/toRead`}>To read</ButtonPrimary></div>
                            <div className="no-decoration"><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to={isMe ? '/me/books/inProgress' : `/users/${user.id}/books/inProgress`}>In progress</ButtonPrimary></div>
                            <div className="no-decoration"><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to={isMe ? '/me/books/finished' : `/users/${user.id}/books/finished`}>Finished</ButtonPrimary></div>
                        </ul>
                    </li>
                </ul>
            </div>

        );
    }

    toggleUpdateUserDialog() {
        this.setState({updateUserDialogActive: !this.state.updateUserDialogActive});
    }
}



