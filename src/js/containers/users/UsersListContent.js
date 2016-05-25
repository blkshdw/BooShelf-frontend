import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Link from 'react-router/lib/Link';
import moment from 'moment';
import {connect} from 'react-redux';
import { pushState } from 'redux-router';
import {bindActionCreators} from 'redux';
import Loader from 'components/Loader';
import { usersListSelector } from 'selectors';
import WidgetUserDialog from 'components/WidgetUserDialog';
import { fetchUsers } from 'actions';

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUsers,
        pushState
    }, dispatch);
}

@connect(usersListSelector, mapDispatchToProps)
export default class UsersListContent extends Component {

    static PropTypes = {
        users: PropTypes.array
    }
    componentWillMount() {
        this.props.fetchUsers()
    }


    render() {
        const { users, isFetching, pushState } = this.props;
        if (isFetching) {
            return <Loader />
        }
        return (
            <div className="users-list">
                <section style={{"height": "80%"}}>
                    <BootstrapTable hover height="90%" options={{onRowClick: (row) => {pushState(null, '/users/' + row.id)}}}  data={users} striped={true} hover={true}>
                        <TableHeaderColumn dataField="username" dataSort isKey={true} dataAlign="center" dataSort={true}>Username</TableHeaderColumn>
                        <TableHeaderColumn dataField="fullName" dataSort>Full Name</TableHeaderColumn>
                        <TableHeaderColumn dataField="birthdayDate" dataFormat={(cell, row) => {return cell ? moment(cell).format('DD/MM/YY') : ''}} dataSort >Birthday</TableHeaderColumn>
                    </BootstrapTable>
                </section>
        </div>
        )
    }
}