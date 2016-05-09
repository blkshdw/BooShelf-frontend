import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import { Button, DropdownButton, MenuItem, ButtonToolbar, ButtonGroup, Form } from 'react-bootstrap';
import cx from './StatisticsHeader.styl';
import { TIME_RANGES } from 'constants/Common';

export default class StatisticsHeader extends Component {
    static propTypes = {
        users: PropTypes.array,
        user: PropTypes.object,
        userId: PropTypes.string,
        filterByUser: PropTypes.func
    }

    render() {
        const { users, userId, filterByUser, filterPeriodFrom, filterPeriodTo, filterRange, user, timeRange } = this.props;
        const timeRanges = [TIME_RANGES.day, TIME_RANGES.week, TIME_RANGES.month]
        return (
            <div className={cx('statistics-header')}>
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
                        <MenuItem onClick={() => this.props.filterByUser('')} active={!userId}>All</MenuItem>
                        {users.map(user => (
                            <MenuItem
                                onClick={() => this.props.filterByUser(user._id)}
                                active={user._id === userId}
                            >
                                {user.name}
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
