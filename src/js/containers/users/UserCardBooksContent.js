import React, { Component, PropTypes } from 'react';
import { fetchBook, fetchTrackings, updateTracking, deleteTracking } from 'actions';
import { UserCardBooks } from 'components/users';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { pushState } from 'redux-router';
import { userTrackingsContentSelector } from 'selectors';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTrackings,
        fetchBook,
        pushState
    }, dispatch);
}

@connect(userTrackingsContentSelector, mapDispatchToProps)
export default class MyBooks extends Component {
    static PropTypes = {
        fetchBook: PropTypes.func
    }

    componentWillMount() {
        this.props.trackings.forEach(tracking => {
            if (!this.props.books[tracking.book] && !this.props.error && (this.props.fetchingBooks.indexOf(tracking.book)) < 0) {
                this.props.fetchBook(tracking.book)
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.trackings !== this.props.trackings) {
            nextProps.trackings.forEach(tracking => {
                if (!nextProps.books[tracking.book] && !nextProps.error && (nextProps.fetchingBooks.indexOf(tracking.book)) < 0) {
                    this.props.fetchBook(tracking.book)
                }
            })
        }
    }

    render() {
        const { trackings, pushState, books, deleteTracking, updateTracking, isUpdating, progress, type } = this.props;
        return (<UserCardBooks trackings={trackings} pushState={pushState} progress={progress} books={books} updateTracking={updateTracking} isUpdating={isUpdating} type={type} /> )
    }
}