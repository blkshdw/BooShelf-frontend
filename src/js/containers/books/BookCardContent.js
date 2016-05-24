import React, { Component, PropTypes } from 'react';
import cx from './BookCardContent.styl';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import {bindActionCreators} from 'redux';
import { updateBook, fetchBook, createTracking, fetchBookReviews, fetchUser, deleteTracking, createReview,
    updateReview,
    deleteReview
} from 'actions';
import { BookCardHeader, BookCardLeftSidebar, BookCardReviews } from 'components/books';
import { bookCardSelector } from 'selectors';
import Loader from 'components/Loader';
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateBook,
        fetchBook,
        fetchBookReviews,
        createTracking,
        fetchUser,
        createReview,
        updateReview,
        deleteReview,
        deleteTracking
    }, dispatch);
}

@connect(bookCardSelector, mapDispatchToProps)

export default class BookCardContent extends Component {

    componentWillMount() {
        this.props.fetchBook(this.props.bookId);
        this.props.fetchBookReviews(this.props.bookId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviews !== this.props.reviews) {
            nextProps.reviews.forEach(review => {
                if (!nextProps.users[review.createdBy] && (nextProps.fetchingUsers.indexOf(review.createdBy) < 0)) {
                    this.props.fetchUser(review.createdBy)
                }
            })
        }
    }

    render() {
        const {book, editable, isFetching, isUpdatingReview, deleteReview, updateReview, createReview, updateBook, users, myReview, reviews, isUpdating, isUpdatingTracking, createTracking, inMyCollection, deleteTracking, myTracking, bookId} = this.props;
        if (!book) {
            return <Loader />
        }
        return (
            <div className={cx('box-col')}>
                <BookCardHeader book={book}
                                createTracking={createTracking}
                                inMyCollection={inMyCollection}
                                myTracking={myTracking}
                                updateBook={updateBook}
                                bookId={bookId}
                                deleteTracking={deleteTracking}
                                isUpdating={isUpdating}
                                isUpdatingTracking={isUpdatingTracking}
                                editable={editable}
                />
                <div className={cx('book-card-container')}>
                    <BookCardLeftSidebar book={book} />
                    <BookCardReviews reviews={reviews} users={users} book={book} isUpdating={isUpdatingReview} deleteReview={deleteReview} myReview={myReview} updateReview={updateReview} createReview={createReview}/>
                </div>
            </div>
        )
    }
}