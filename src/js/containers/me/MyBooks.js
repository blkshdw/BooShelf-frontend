import React, { Component, PropTypes } from 'react';
import { fetchBook, fetchTrackings, updateTracking, deleteTracking } from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { myTrackingsContentSelector } from 'selectors';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTrackings,
        fetchBook,
        updateTracking,
        deleteTracking
    }, dispatch);
}

@connect(myTrackingsContentSelector, mapDispatchToProps)
export default class MyBooks extends Component {
    static PropTypes = {
        user: PropTypes.object,
        children: PropTypes.node.isRequired,
        fetchBook: PropTypes.func,
        fetchTrackings: PropTypes.func,
        updateTracking: PropTypes.func,
        deleteTracking: PropTypes.func
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
        return <div >
            It is my book
        </div>
    }
}