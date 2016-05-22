import React, { Component, PropTypes } from 'react';
import { BooksHeader, BooksList } from 'components/books'
import cx from './BooksContent.styl';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import {bindActionCreators} from 'redux';
import { booksListSelector } from 'selectors';
import WidgetUserDialog from 'components/WidgetUserDialog';
import { fetchBooks, createBook, booksFilterTitle, booksFilterGenre, booksFilterAuthor } from 'actions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBooks,
        createBook,
        booksFilterTitle,
        booksFilterGenre,
        booksFilterAuthor,
        pushState
    }, dispatch);
}

@connect(booksListSelector, mapDispatchToProps)
export default class BooksContent extends Component {
    static PropTypes = {
        books: PropTypes.array,
        booksStatus: PropTypes.object,
        booksFilterTitle,
        booksFilterGenre,
        booksFilterAuthor
    }
    componentWillMount() {
        this.props.fetchBooks()
    }

    render() {
        const { books, booksStatus, booksFilterAuthor, createBook, booksFilterTitle, pushState, booksFilterGenre } = this.props;

        return (
            <div className={cx('books-content')}>
                <BooksHeader
                    booksFilterAuthor={booksFilterAuthor}
                    booksFilterTitle={booksFilterTitle}
                    booksFilterGenre={booksFilterGenre}
                    currentFilterTitle={booksStatus.currentFilterTitle}
                    currentFilterGenre={booksStatus.currentFilterGenre}
                    currentFilterAuthor={booksStatus.currentFilterAuthor}
                />
                <BooksList books={books} createBook={createBook} pushState={pushState} isCreating={booksStatus.isCreating} error={booksStatus.error} />
            </div>
        )
    }
}