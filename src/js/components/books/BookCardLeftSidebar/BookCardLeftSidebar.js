import { isEmpty, last } from 'lodash';
import Avatar from 'react-avatar';
import React, { Component, PropTypes } from 'react';
import {Button, Panel} from 'react-bootstrap';
import ButtonPrimary from 'components/ButtonPrimary';
import moment from 'moment';
import cx from './BookCardLeftSidebar.styl';

export default class BookCardLeftSidebar extends Component {
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
                <Panel header="Written on" bSize="small" bsStyle="info" className={cx('panel')}>
                    {book.writtenOn ? moment(book.writtenOn).format('MMMM, YYYY') : 'Not stated'}
                </Panel>
                <Panel header="Genre" bSize="small" bsStyle="info" className={cx('panel')}>
                    {book.genre ? book.genre : 'Not stated'}
                </Panel>
                <Panel header="Overview" bSize="small" bsStyle="info" className={cx('panel')}>
                    <div className={cx('book-about')}> {book.description ? book.description : 'Not stated'} </div>
                </Panel>
            </div>

        );
    }

    toggleUpdateUserDialog() {
        this.setState({updateUserDialogActive: !this.state.updateUserDialogActive});
    }
}



