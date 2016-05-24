import React, { Component, PropTypes } from 'react';
import { Panel, Button, ButtonToolbar, Well } from 'react-bootstrap';
import DeleteModal from 'components/DeleteModal';
import StarRating from 'react-star-rating';
import WidgetReviewEdit from 'components/WidgetReviewEdit';
import WidgetReviewCreate from 'components/WidgetReviewCreate';
import cx from './UserCardReviews.styl';

export default class UserCardReviews extends Component {
    static PropTypes = {
        reviews: PropTypes.array,
        updateReview: PropTypes.func,
        deleteReview: PropTypes.func,
        createReview: PropTypes.func,
        book: PropTypes.object
    }
    
    state = {
        isEditingReview: false,
        isDeletingReview: false,
        isCreatingReview: false
    }

    render() {
        const { reviews, users, myReview, isUpdating, createReview, book } = this.props;
        const { isEditingReview, isDeletingReview, isCreatingReview } = this.state;
        return (
            <div className={cx('bookcard-reviews')}>
                { !myReview &&
                <ButtonToolbar pullRight className={cx('right-btn')}>
                    <Button bStyle="primary" onClick={() => this.handleCreateReview()}>Review!</Button>
                </ButtonToolbar>
                }
                <div className={cx('reviews-list')}>


                    {
                        isEditingReview ?
                            <WidgetReviewEdit
                            title={myReview.title}
                            content={myReview.content}
                            isUpdating={isUpdating}
                            updateReview={(values) => {
                                this.props.updateReview(myReview.id, values);
                            }
                            }
                            rating={myReview.rating}
                            book={book}
                            bookTitle={book.title}
                            active={isEditingReview}
                            closeDialogs={::this.closeDialogs}
                        /> : ''
                    }

                    {
                        isCreatingReview ?
                            <WidgetReviewCreate
                                book={book}
                                isUpdating={isUpdating}
                                createReview={(values) => {
                                this.props.createReview(values);
                            }
                            }
                                active={isCreatingReview}
                                closeDialogs={::this.closeDialogs}
                            /> : ''
                    }


                    {
                        isDeletingReview ?
                            <DeleteModal
                                object={book.title + ' review'}
                                active={isDeletingReview}
                                onDelete={() => {
                                    this.props.deleteReview(myReview);
                                    this.closeDialogs();
                                }

                                }
                                onClose={() => this.closeDialogs()}
                            /> : ''

                    }

                    {reviews.map(review => {
                        const header = (
                            <div className={cx('title-panel')}>
                                <div className={cx('title')} >{review.title}</div>
                                {myReview === review ?
                                    <ButtonToolbar>
                                        <Button onClick={() => this.handleEditReview(review)}>Edit</Button>
                                        <Button bsStyle="danger" onClick={() => this.handleDeleteReview(review)} >Delete</Button>
                                    </ButtonToolbar> :
                                    <div className="author">
                                        {users[review.createdBy] ? users[review.createdBy].fullName || users[review.createdBy].username : ''}
                                    </div>
                                }
                            </div>
                        );
                        return (<Panel header={header} key={review.id}
                               className={cx('panel')}>
                            <div className={cx('review-name')}>
                                <StarRating name="rating-inlist" size={20} disabled editing={false} rating={review.rating}/></div>
                            <div className={cx('review-content')}>
                                {review.content}
                            </div>
                        </Panel>)
                    })}
                </div>
            </div>)
    }

    closeDialogs() {
        this.setState({
            isEditingReview: false,
            isDeletingReview: false,
            isCreatingReview: false
        })
    }
    
    handleEditReview(review) {
        this.setState({isEditingReview: true})
    }

    handleDeleteReview(review) {
        this.setState({isDeletingReview: true})
    }

    handleCreateReview() {
        this.setState({isCreatingReview: true})
    }
}