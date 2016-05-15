import React, { Component, PropTypes } from 'react';
import Table from 'react-bootstrap';
import Link from 'react-router/lib/Link';

export default class UsersListContent extends Component {
    static PropTypes = {
        users: PropTypes.array
    }
    render() {
        const { users } = this.props;
        return (
            <div className="users-list">
            <Table responsive>
                <thead>
                <tr>
                    <th>#</th>
                    <th></th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Full Name</th>
                    <th>Profile</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    { users.map((user, index) => {
                        return(
                            <tr>
                                <td>{index}</td>
                                <td>{user.username || ''}</td>
                                <td>{user.age || 'Not stated'}</td>
                                <td>{user.fullName || 'Not stated'}</td>
                                <td><Link to={"users/" + user.id}>Profile</Link></td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                    )})}
                </tbody>
            </Table>
        </div>
        )
    }
}