import React, { Component, PropTypes } from 'react';
import { updateProfile } from 'actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { myProfileSelector } from 'selectors';
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchTrackings
    }, dispatch);
}

@connect(myProfileSelector, mapDispatchToProps)
export default class MyBooks extends Component {
    static PropTypes = {
        user: PropTypes.object,
        children: PropTypes.node.isRequired,
        fetchTrackings: PropTypes.func
    }

    render() {
        return <div >
            It is my book
        </div>
    }
}