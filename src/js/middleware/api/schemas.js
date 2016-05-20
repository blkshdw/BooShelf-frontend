import { Schema, arrayOf } from 'normalizr';

const userSchema = new Schema('users', {
    idAttribute: 'id'
});

const reviewSchema = new Schema('reviews', {
    idAttribute: 'id'
});

const bookSchema = new Schema('books', {
    idAttribute: 'id',
});

const trackingSchema = new Schema('trackings', {
    idAttribute: 'id',
});

export default {
    USER: userSchema,
    BOOK: bookSchema,
    BOOK_ARRAY: arrayOf(bookSchema),
    USER_ARRAY: arrayOf(userSchema),
    TRACKING: trackingSchema,
    TRACKING_ARRAY: arrayOf(trackingSchema),
    REVIEW: reviewSchema,
    REVIEW_ARRAY: arrayOf(reviewSchema)
};