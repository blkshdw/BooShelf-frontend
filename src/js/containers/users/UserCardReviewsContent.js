import React, { Component, PropTypes } from 'react';
import { UserCardReviews } from 'components/users';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { userCardReviewsContentSelector } from 'selectors';
import WidgetUserDialog from 'components/WidgetUserDialog';
import { fetchUserReviews, updateReview, createReview, fetchBook, deleteReview } from 'actions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUserReviews,
        updateReview,
        deleteReview,
        fetchBook
    }, dispatch);
}

@connect(userCardReviewsContentSelector, mapDispatchToProps)
export default class UserCardReviewsContent extends Component {
    static PropTypes = {
        reviews: PropTypes.array,
        fetchBook: PropTypes.func,
        fetchMyReviews: PropTypes.func,
        updateReview: PropTypes.func,
        fetchingBooks: PropTypes.array,
        books: PropTypes.object,
        error: PropTypes.string
    }

    componentWillMount() {
        this.props.fetchUserReviews(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviews !== this.props.reviews) {
            nextProps.reviews.forEach(review => {
                if (!nextProps.books[review.book] && !nextProps.error && (nextProps.fetchingBooks.indexOf(review.book)) < 0) {
                    this.props.fetchBook(review.book)
                }
            })
        }
    }

    render() {
        const { reviews, books, deleteReview, updateReview } = this.props;
        return (<div className="box-row">
            <UserCardReviews reviews={reviews} books={books} deleteReview={deleteReview} updateReview={updateReview}/>
        </div>)
    }
}