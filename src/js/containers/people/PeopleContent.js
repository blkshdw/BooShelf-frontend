import React, {Component, PropTypes} from 'react';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {Table} from 'react-toolbox';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {usersListSelector} from 'selectors';
import WidgetUserDialog from 'components/WidgetUserDialog';

import {
    createUser,
    deleteUsers,
    fetchUsers,
} from 'actions';

import cx from './PeopleContent.styl';

import {isEmpty} from 'lodash';

const UserModel = {
    email: {type: String},
    name: {type: String},
    role: {type: String}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createUser,
        deleteUsers,
        fetchUsers
    }, dispatch);
}
//@TODO refactor
@connect(usersListSelector, mapDispatchToProps)
export default class PeopleContent extends Component {
    static propTypes = {
        createUser: PropTypes.func,
        deleteUsers: PropTypes.func,
        fetchUsers: PropTypes.func,
        isFetching: PropTypes.bool,
        users: PropTypes.array
    };

    state = {
        selected: [],
        createUserDialogActive: false
    };

    componentWillMount() {
        this.props.fetchUsers();
    }

    render() {
        const {users, isFetching, ...actions} = this.props;

        return (
            <section className={cx('people-content')}>
                <section className={cx('people-content-header')}>
                    <div className={cx('people-content-header-title')}>
                        People
                    </div>
                    <WidgetUserDialog
                        createUser={actions.createUser}
                        active={this.state.createUserDialogActive}
                        toggleCreateUserDialog={::this.toggleCreateUserDialog}
                    />
                    <ButtonToolbar className={cx('people-content-header-actions')}>
                        {!isEmpty(this.state.selected) &&
                        <Button onClick={::this.handleDeleteUsers} bsStyle="danger">
                            Delete selected users
                        </Button>
                        }
                        <Button bsStyle="primary" onClick={::this.toggleCreateUserDialog}>
                            Add user
                        </Button>
                    </ButtonToolbar>
                </section>
                <section className={cx('people-content-table')}>
                    <Table
                        model={UserModel}
                        onSelect={::this.handleSelect}
                        selectable
                        selected={this.state.selected}
                        source={this.props.users}
                    />
                </section>
            </section>
        );
    }

    toggleCreateUserDialog() {
        this.setState({createUserDialogActive: !this.state.createUserDialogActive});
    }

    handleDeleteUsers() {
        return this.props.deleteUsers(this.state.selected.map(index => this.props.users[index]._id));
    }

    handleSelect(selected) {
        this.setState({selected});
    }
}
