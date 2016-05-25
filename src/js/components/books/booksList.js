import React, { Component, PropTypes } from 'react';
import cx from './booksList.styl';
import { genres } from 'constants/Common';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import WidgetCreateBook from './WidgetCreateBook';


export default class BooksList extends Component {
    static PropTypes = {
        books: PropTypes.array,
        pushState: PropTypes.func,
        createBook: PropTypes.func,
        error: PropTypes.string,
        isUpdating: PropTypes.bool
    }

    static defaultProps = {
        books: []
    }

    state = {
        createBookDialogActive: false
    }

    render() {
        const {books, pushState, error, isUpdating, createBook } = this.props;

        return(
            <section className={cx('people-content')}>
                <section className={cx('people-content-header')}>
                    <div className={cx('people-content-header-title')}>
                        Books
                    </div>
                    {this.state.createBookDialogActive ?
                        <WidgetCreateBook
                            createBook={createBook}
                            genres={genres}
                            isCreating={isUpdating}
                            error={error}
                            active={this.state.createBookDialogActive}
                            toggleCreateBookDialog={::this.toggleCreateBookDialog}
                        /> : ''
                    }

                    <ButtonToolbar className={cx('people-content-header-actions')}>
                        <Button bsStyle="primary" onClick={::this.toggleCreateBookDialog}>
                            Add book
                        </Button>
                    </ButtonToolbar>
                </section>
                <section height="10rem" className={cx('people-content-table')}>
                    <BootstrapTable hover height="90%" options={{onRowClick: (row) => {pushState(null, '/books/' + row.id)}}}  data={books} striped={true} hover={true}>
                        <TableHeaderColumn dataField="title" dataSort isKey={true} dataAlign="center" dataSort={true}>Title</TableHeaderColumn>
                        <TableHeaderColumn dataField="author" dataSort>Author</TableHeaderColumn>
                        <TableHeaderColumn dataField="genre" dataSort >Genre</TableHeaderColumn>
                        <TableHeaderColumn dataField="popularity" dataSort >Popularity</TableHeaderColumn>
                    </BootstrapTable>
                </section>
            </section>
        )
    }

    toggleCreateBookDialog() {
        this.setState({createBookDialogActive: !this.state.createBookDialogActive});
    }

}