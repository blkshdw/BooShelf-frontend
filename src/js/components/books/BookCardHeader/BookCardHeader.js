import { isEmpty, last } from 'lodash';
import Avatar from 'react-avatar';
import React, { Component, PropTypes } from 'react';
import {Button, ButtonToolbar, Glyphicon } from 'react-bootstrap';
import cx from './BookCardHeader.styl';
import moment from 'moment';
import WidgetEditBook from './WidgetEditBook';

export default class BookCardHeader extends Component {
    static propTypes = {
        book: PropTypes.object,
        editable: PropTypes.bool,
        updateBook: PropTypes.func
    }

    state = {
        updateBookDialogActive: false
    }

    render() {
        const {book, updateBook, editable, isUpdating, isUpdatingTracking, error, bookId, myTracking, inMyCollection} = this.props;

        return (
            <div className={cx('usercard-header', 'box-row')}>
                    <div className="">
                        <div className={cx('book-title')}> {book.title}
                            {this.state.updateBookDialogActive ? <WidgetEditBook
                            active={this.state.updateBookDialogActive}
                            updateBook={::this.handleUpdateBook}
                            isUpdating={isUpdating}
                            error={error}
                            author={book.author}
                            title={book.title}
                            description={book.description}
                            writtenOn={book.writtenOn}
                            genre={book.genre}
                            coverUrl={book.coverUrl}
                            toggleUpdateBookDialog={::this.toggleUpdateBookDialog}
                        /> : ''}</div>
                        <div className={cx('added')} >
                            On the booShelf of <b>{book.popularity}</b> users
                        </div>
                        <div className={cx('buttons')}>
                            {!inMyCollection ?
                                <Button disabled={isUpdatingTracking} bsStyle="primary" onClick={() => this.handleAddTracking(book)}>
                                    <Glyphicon glyph="star" />
                                    To my collection
                                </Button> :
                                <Button disabled={isUpdatingTracking} bsStyle="danger" onClick={() => this.handleRemoveTracking(myTracking)}>
                                    <Glyphicon glyph="remove" />
                                    Remove from my collection
                                </Button>
                            }
                            {editable && <Button bsStyle="warning" className={cx('edit-button')} onClick={::this.toggleUpdateBookDialog} >Edit</Button> }
                        </div>
                        <br />
                    </div>
                    <div ><a className={cx('pull-right', 'author')} >by {book.author}</a>
                        </div>
            </div>
        );
    }

    handleAddTracking(book) {
        this.props.createTracking({book: book.id});
    }

    handleUpdateBook(values) {
        this.props.updateBook(this.props.bookId, values);
    }

    handleRemoveTracking(tracking) {
        this.props.deleteTracking(tracking)
    }

    toggleUpdateBookDialog() {
        this.setState({updateBookDialogActive: !this.state.updateBookDialogActive});
    }
}