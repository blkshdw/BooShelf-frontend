import React, { Component, PropTypes } from 'react';
import { Panel, Button, ButtonToolbar, Well } from 'react-bootstrap';
import Link from 'react-router/lib/Link';
import DeleteModal from 'components/DeleteModal';
import StarRating from 'react-star-rating';
import WidgetReviewEdit from './../../WidgetReviewEdit/WidgetReviewEdit';
import cx from './UserCardReviews.styl';

export default class UserCardReviews extends Component {
    static PropTypes = {
        reviews: PropTypes.array,
        updateReview: PropTypes.func,
        deleteReview: PropTypes.func,
        books: PropTypes.object
    }

    static defaultProps = {
        reviews: [
            {
                id: 12312314,
                book: 1,
                title: "Make a review",
                content: "It is simple!",
                rating: 4
            }
        ]
    }
    
    state = {
        currentEditReview: '',
        currentDeleteReview: ''
    }

    render() {
        const { reviews, books } = this.props;
        const { currentEditReview, currentDeleteReview } = this.state;
        return (<div className={cx('reviews-list')}>
            {
                currentEditReview ?
                    <WidgetReviewEdit
                    title={currentEditReview.title}
                    content={currentEditReview.content}
                    updateReview={(values) => {
                        this.props.updateReview(currentEditReview.id, values);
                        this.closeDialogs();
                    }
                    }
                    rating={currentEditReview.rating}
                    bookTitle={books[currentEditReview.book] ? books[currentEditReview.book].title || currentEditReview.id : currentEditReview.id}
                    active={currentEditReview ? true : false}
                    closeDialogs={::this.closeDialogs}
                /> : ''
            }

            {
                currentDeleteReview ?
                    <DeleteModal
                        object={(books[currentDeleteReview.book] ? books[currentDeleteReview.book].title || currentDeleteReview.id : currentDeleteReview.id) + " review"}
                        active={currentDeleteReview ? true : false}
                        onDelete={() => {
                            this.props.deleteReview(currentDeleteReview);
                            this.closeDialogs();
                        }

                        }
                        onClose={() => this.closeDialogs()}
                    /> : ''

            }

            {reviews.map(review => {
                const header = (
                    <div className={cx('title-panel')}>
                        <div className={cx('title')}><Link to={'/books/' + review.book} >{books[review.book] ? books[review.book].title || review.book : review.book}</Link></div>
                        <ButtonToolbar>
                            <Button onClick={() => this.handleEditReview(review)}>Edit</Button>
                            <Button bsStyle="danger" onClick={() => this.handleDeleteReview(review)} >Delete</Button>
                        </ButtonToolbar>
                    </div>
                );
                return (<Panel header={header} key={review.id}
                       className={cx('panel')}>
                    <div className={cx('review-name')}>
                        <div className={cx('name')}>{review.title}</div>
                        <StarRating name="rating-inlist" size={20} disabled editing={false} rating={review.rating}/></div>
                    <div className={cx('review-content')}>{review.content} </div>
                </Panel>)
            })}
        </div>)
    }

    closeDialogs() {
        this.setState({
            currentEditReview: '',
            currentDeleteReview: ''
        })
    }
    
    handleEditReview(review) {
        this.setState({currentEditReview: review})
    }

    handleDeleteReview(review) {
        this.setState({currentDeleteReview: review})
    }
}