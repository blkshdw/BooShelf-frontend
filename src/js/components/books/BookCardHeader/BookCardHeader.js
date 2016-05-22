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
        const {book, updateBook, editable, isUpdating, error, bookId} = this.props;

        return (
            <div className={cx('usercard-header', 'box-row')}>
                    <div className="">
                        <h2 className={cx('book-title')}> {book.title}
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
                        /> : ''}</h2>
                        <div className={cx('about')} >
                            {book.description}
                        </div>
                        <ButtonToolbar className={cx('buttons')}>
                            <Button bsStyle="primary" onClick={() => this.handleAddTracking(book)}>
                                <Glyphicon glyph="star" />
                                To my collection
                            </Button>
                            {editable && <Button bsStyle="warning" className={cx('edit-button')} onClick={::this.toggleUpdateBookDialog} >Edit</Button> }
                        </ButtonToolbar>
                        <br />
                    </div>
                    <div className="col-sm-2"><a className={cx('pull-right', 'author')} >by {book.author}</a>
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

    toggleUpdateBookDialog() {
        this.setState({updateBookDialogActive: !this.state.updateBookDialogActive});
    }
}