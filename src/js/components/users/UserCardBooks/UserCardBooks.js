import React, { Component, PropTypes } from 'react';
import cx from './UserCardBooks.styl';
import Link from 'react-router/lib/Link';
import { TRACKING_TYPES } from 'constants/Common';
import { ButtonToolbar, Button, ProgressBar } from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import WidgetTrackingEdit from 'components/WidgetTrackingEdit';


export default class UserCardBooks extends Component {
    static PropTypes = {
        books: PropTypes.object,
        trackings: PropTypes.array,
        pushState: PropTypes.func,
        createBook: PropTypes.func,
        error: PropTypes.string,
        isUpdating: PropTypes.bool
    }

    static defaultProps = {
        books: []
    }

    state = {
        currentEditTracking: '',
        currentDeleteTracking: ''
    }

    render() {
        const {books, trackings, pushState, editable, progress, error, type, isUpdating, updateTracking } = this.props;
        return(
            <section className={cx('usercard-books')}>
                <section className={cx('people-content-header')}>
                    <ProgressBar now={progress} label={`${progress}%`} />
                    {this.state.currentEditTracking ?
                        <WidgetTrackingEdit
                            updateTracking={updateTracking}
                            TRACKING_TYPES={TRACKING_TYPES}
                            isUpdating={isUpdating}
                            error={error}
                            bookTitle={books[this.state.currentEditTracking.book] ? books[this.state.currentEditTracking.book].title : this.state.currentEditTracking.book}
                            closeDialogs={::this.handleCloseDialogs}
                            tracking={this.state.currentEditTracking}
                            active={this.state.currentEditTracking ? true : false}
                            toggleEditTrackingDialog={::this.toggleEditTrackingDialog}
                        /> : ''
                    }
                </section>
                <section className={cx('user-card-books')}>
                    {editable ? <BootstrapTable hover options={{onRowClick: (row) => this.toggleEditTrackingDialog(row)}}  data={trackings} striped={true} hover={true}>
                        <TableHeaderColumn dataFormat={(cell, row) => <Link to={"/books/" + row.book}>{books[row.book] ? books[row.book].title : row.id}</Link>} dataField="book" dataSort isKey={true} dataAlign="center" dataSort={true}>Book</TableHeaderColumn>
                        <TableHeaderColumn dataField="pagesRead" dataFormat={(cell, row) => {return (cell || cell === 0) ? Math.round((cell / row.pagesCount) * 100) : ''}} dataSort>Progress, %</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={(cell, row) => {return cell ? moment(cell).format('DD/MM/YY') : ''}} dataField="startedReading" dataSort >Started reading</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={(cell, row) => {return cell ? moment(cell).format('DD/MM/YY') : ''}} dataField="finishedReading" dataSort >Finished reading</TableHeaderColumn>
                        <TableHeaderColumn dataField="status" dataFormat={(cell, row) => TRACKING_TYPES[cell] ? TRACKING_TYPES[cell] : ''} dataSort>Status</TableHeaderColumn>
                    </BootstrapTable> :
                        <BootstrapTable hover data={trackings} striped={true} hover={true}>
                            <TableHeaderColumn dataFormat={(cell, row) => <Link to={"/books/" + row.book}>{books[row.book] ? books[row.book].title : row.id}</Link>} dataField="book" dataSort isKey={true} dataAlign="center" dataSort={true}>Book</TableHeaderColumn>
                            <TableHeaderColumn dataField="pagesRead" dataFormat={(cell, row) => {return cell ? Math.round(cell / row.pagesCount) : ''}} dataSort>Progress, %</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={(cell, row) => {return cell ? moment(cell).format('DD/MM/YY') : ''}} dataField="startedReading" dataSort >Started reading</TableHeaderColumn>
                            <TableHeaderColumn dataFormat={(cell, row) => {return cell ? moment(cell).format('DD/MM/YY') : ''}} dataField="finishedReading" dataSort >Finished reading</TableHeaderColumn>
                            <TableHeaderColumn dataField="status" dataFormat={(cell, row) => TRACKING_TYPES[cell] ? TRACKING_TYPES[cell] : ''} dataSort>Status</TableHeaderColumn>
                        </BootstrapTable>
                    }

                </section>
            </section>
        )
    }

    toggleEditTrackingDialog(tracking) {
        if (this.props.editable) {
            this.setState({currentEditTracking: tracking});
        }

    }

    toggleDeleteTrackingDialog(tracking) {
        if (this.props.editable) {
            this.setState({currentDeleteTracking: tracking});
        }

    }

    handleCloseDialogs() {
        this.setState({currentEditTracking: '', currentDeleteTracking: ''});
    }



}