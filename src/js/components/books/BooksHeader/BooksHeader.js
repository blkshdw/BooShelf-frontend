import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import { debounce } from  'utils/decorators';
import { Button, DropdownButton, MenuItem, ButtonToolbar, ButtonGroup, FormGroup, FormControl, Form } from 'react-bootstrap';
import cx from './BooksHeader.styl';
import { genres } from 'constants/Common';

export default class BooksHeader extends Component {
    static propTypes = {
        users: PropTypes.array,
        currentFilterGenre: PropTypes.string,
        currentFilterAuthor: PropTypes.string,
        currentFilterTitle: PropTypes.string,
        booksFilterAuthor: PropTypes.func,
        booksFilterGenre: PropTypes.func,
        booksFilterTitle: PropTypes.func,
        userId: PropTypes.string,
        filterByUser: PropTypes.func
    }

    static defaultProps = {
        users: [],
        currentFilterTitle: '',
        currentFilterAuthor: ''
    }

    render() {
        const { users, userId, filterByAuthor, currentFilterAuthor, currentFilterTitle, booksFilterGenre, currentFilterGenre, filterByName } = this.props;
        return (
            <div className={cx('books-header')}>
                <span className={cx('statistics-header-title')}>Filters</span>
                <ButtonToolbar className={cx('statistics-header-filters-left')}>
                    <ButtonGroup className={cx('buttons-left')}>
                        <FormControl onChange={e => { this.handleInputTitle(e.target.value) }} defaultValue={currentFilterTitle} type="text" placeholder="Title" />
                    </ButtonGroup>
                    <ButtonGroup className={cx('buttons-left')}>
                        <FormControl onChange={e => { this.handleInputAuthor(e.target.value) }} defaultValue={currentFilterAuthor}  type="text" placeholder="Author" />
                    </ButtonGroup>
                </ButtonToolbar>

                <div className={cx('statistics-header-filters-right')}>
                    <DropdownButton
                        className={cx('buttons-left')}
                        id="users-select"
                        bsStyle="default"
                        bsSize="small"
                        title={currentFilterGenre ? currentFilterGenre : 'All Genres'}
                    >
                        <MenuItem onClick={() => this.props.booksFilterGenre('')} active={!currentFilterGenre}>All</MenuItem>
                        {genres.map((genre, idx) => (
                            <MenuItem
                                onClick={() => this.props.booksFilterGenre(genre)}
                                key={idx}
                                active={genre === currentFilterGenre}
                            >
                                {genre}
                            </MenuItem>
                        ))}
                    </DropdownButton>
                </div>
            </div>
        );
    }

    handleUserSelect(value) {
        this.props.filterByUser(value);
    }

    @debounce(500)
    handleInputTitle(title) {
        this.props.booksFilterTitle(title);
    }

    @debounce(500)
    handleInputAuthor(author) {
        this.props.booksFilterAuthor(author);
    }
    
}
