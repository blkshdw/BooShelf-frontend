import {
    createDeepEqualSelector,
    entitiesArraySelector,
    statusSelector,
    routerParamSelector,
    entitiesSelector,
    currentUserSelector
} from './common';


export const filteredBooksSelector = createDeepEqualSelector(
    [entitiesArraySelector('books'), statusSelector('books')],
    (books, booksStatus) => {
        const {currentFilterAuthor, currentFilterTitle, currentFilterGenre} = booksStatus;
        return books.filter(book => {
            if (currentFilterTitle) {
                if (!book.title) {
                    return false
                }
                try {
                    if (!book.title.toLocaleLowerCase().includes(currentFilterTitle.toLocaleLowerCase()) && !book.title.match(currentFilterTitle)) {
                        return false
                    }
                } catch(e) {
                    return false
                }

            }
            if (currentFilterAuthor) {
                if (!book.author) {
                    return false
                }
                try {
                    if (!book.author.toLocaleLowerCase().includes(currentFilterAuthor.toLocaleLowerCase()) && !book.author.match(currentFilterAuthor)) {
                        return false
                    }
                } catch(e) {
                    return false
                }

            }
            if (currentFilterGenre) {
                if (book.genre !== currentFilterGenre) {
                    return false
                }
            }
            return true
        })
    }
)

export const booksListSelector = createDeepEqualSelector(
    [filteredBooksSelector, statusSelector('books')],
    (filteredBooks, booksStatus) => ({
        books: filteredBooks,
        booksStatus: booksStatus
    })
);

export const bookCardSelector = createDeepEqualSelector(
    [entitiesSelector('books'), currentUserSelector, routerParamSelector('bookId'), statusSelector('books')],
    (books, currentUser, bookId, booksStatus) => ({
        book: books[bookId],
        bookId: bookId,
        isFetching: booksStatus.isFetching,
        editable: books[bookId] ? books[bookId].createdBy === currentUser.id : false
    })
)