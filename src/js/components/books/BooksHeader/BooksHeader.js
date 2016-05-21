import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import { Button, DropdownButton, MenuItem, ButtonToolbar, ButtonGroup, Form } from 'react-bootstrap';
import cx from './BooksHeader.styl';
import { TIME_RANGES } from 'constants/Common';

export default class BooksHeader extends Component {
    static propTypes = {
        users: PropTypes.array,
        user: PropTypes.object,
        userId: PropTypes.string,
        filterByUser: PropTypes.func
    }

    render() {
        const { users, userId, filterByAuthor, filterByGenre, filterByName } = this.props;
        return (
            <div className={cx('books-header')}>
                <span className={cx('statistics-header-title')}>Filters</span>
                <ButtonToolbar className={cx('statistics-header-filters-left')}>
                    <ButtonGroup className={cx('buttons-left')}>
                        {timeRanges.map(range => (
                            <Button
                                bsSize="small"
                                type="button"
                                onClick={() => this.props.filterRange(range)}
                                active={range === timeRange}
                            >
                                {range}
                            </Button>
                        ))}
                    </ButtonGroup>

                    <DropdownButton
                        className={cx('buttons-left')}
                        id="users-select"
                        bsStyle="default"
                        bsSize="small"
                        title={user ? user.name || user._id : 'All'}
                    >
                        <MenuItem onClick={() => this.props.filterByGenre('')} active={!currentGenre}>All</MenuItem>
                        {genres.map(user => (
                            <MenuItem
                                onClick={() => this.props.filterByGenre(genre)}
                                active={genre === currentGenre}
                            >
                                {genre}
                            </MenuItem>
                        ))}
                    </DropdownButton>
                </ButtonToolbar>

                <div className={cx('statistics-header-filters-right')}>
                    <div className={cx('statistics-header-datepicker')}>
                        <DatePicker
                            className={cx('form-control')}
                            placeholderText="From"
                            selected={this.props.periodFrom}
                            onChange={(value) => this.props.filterPeriodFrom(value)}
                            isClearable={true}
                        />
                    </div>

                    <div className={cx('statistics-header-datepicker')}>
                        <DatePicker
                            className={cx('form-control')}
                            placeholderText="To"
                            selected={this.props.periodTo}
                            onChange={(value) => this.props.filterPeriodTo(value)}
                            isClearable={true}
                        />
                    </div>
                </div>
            </div>
        );
    }

    handleUserSelect(value) {
        this.props.filterByUser(value);
    }
}
