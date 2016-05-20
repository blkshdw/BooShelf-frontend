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
        const {user} = this.props;

        return (
            
            <div className={cx('usercard-navigation')}>
                <ul className={cx('main-menu', 'nav nav-stacked affix')}>
                    <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to="/me/reviews">Reviews</ButtonPrimary></li>
                    <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to="/me/books/all">My books</ButtonPrimary>
                        <ul className={cx('sub-menu')}>
                            <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to="/me/books/toRead">To read</ButtonPrimary></li>
                            <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to="/me/books/inProgress">In progress</ButtonPrimary></li>
                            <li><ButtonPrimary className={cx('no-decoration vertical-align', 'nav-but')} to="/me/books/finished">Finished</ButtonPrimary></li>
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



