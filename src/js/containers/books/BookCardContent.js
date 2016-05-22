import React, { Component, PropTypes } from 'react';
import cx from './BookCardContent.styl';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import {bindActionCreators} from 'redux';
import { updateBook, fetchBook, createTracking, deleteTracking } from 'actions';
import { BookCardHeader, BookCardLeftSidebar } from 'components/books';
import { bookCardSelector } from 'selectors';
import Loader from 'components/Loader';
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateBook,
        fetchBook,
        createTracking,
        deleteTracking
    }, dispatch);
}

@connect(bookCardSelector, mapDispatchToProps)

export default class BookCardContent extends Component {

    componentWillMount() {
        this.props.fetchBook(this.props.bookId);
    }
    render() {
        const {book, editable, isFetching, updateBook, createTracking, deleteTracking, bookId} = this.props;
        if (!book) {
            return <Loader />
        }
        return (
            <div className={cx('box-col')}>
                <BookCardHeader book={book} createTracking={createTracking} updateBook={updateBook} bookId={bookId} deleteTracking={deleteTracking} editable={editable}/>
            </div>
        )
    }
}