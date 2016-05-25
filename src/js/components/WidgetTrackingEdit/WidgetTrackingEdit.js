import React, {Component, PropTypes} from 'react';
import ReactSliderNativeBootstrap from 'react-bootstrap-native-slider';
import {Modal, FormControl, FormGroup, ControlLabel, Form, Button, Col, InputGroup} from 'react-bootstrap';
import DateTimeField from 'react-bootstrap-datetimepicker';
import StarRating from 'react-star-rating';
import cx from './WidgetTrackingEdit.styl';

export default class WidgetTrackingEdit extends Component {
    static propTypes = {
        updateReview: PropTypes.func,
        toggleEditReviewDialog: PropTypes.func,
        active: PropTypes.bool
    };

    constructor(props) {
        super(props);
        const { tracking } = props;
        this.state = {
            status: tracking.status || 0,
            progress: tracking.progress || 0,
            pagesCount: tracking.pagesCount || 0,
            pagesRead: tracking.pagesRead || 0,
            startedReading: tracking.startedReading,
            finishedReading: tracking.finishedReading
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.active && !nextProps.isUpdating && !nextProps.error) {
            return this.props.closeDialogs();
        }
    }

    render() {
        const {active, closeDialogs, isUpdating, error, TRACKING_TYPES} = this.props;
        const startedReadingProps = this.state.startedReading ? {
            dateTime: this.state.startedReading
        } : {
            defaultText: "Started reading"
        };
        const finishedReadingProps = this.state.finishedReading ? {
            dateTime: this.state.startedReading
        } : {
            defaultText: "Finished reading"
        };
        return (
            <Modal show={active} onHide={closeDialogs} bsSize="large">
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.bookTitle} tracking</Modal.Title>
                </Modal.Header>
                {error && <div style={{"color": "red", "marginLeft": "160px", "marginTop": "5px"}}>Error: {error}</div> }
                <Modal.Body>
                    <Form horizontal>

                        <FormGroup controlId="formHorizontalRole">
                            <Col componentClass={ControlLabel} sm={2}>
                                Status
                            </Col>

                            <Col sm={10}>
                                <FormControl
                                    componentClass="select"
                                    placeholder="role"
                                    value={this.state.status}
                                    onChange={this.handleChangeProp('status')}
                                >
                                    {TRACKING_TYPES.map((text, id) => (
                                        <option value={id} key={id}>
                                            {text}
                                        </option>
                                    ))}
                                </FormControl>
                            </Col>
                        </FormGroup>

                        <Form style={{"marginLeft": "170px", "marginBottom": "8px"}} componentClass="fieldset" inline>
                            <FormGroup controlId="formValidationWarning4" validationState={this.getValidationReadCount()}>
                                <ControlLabel>Read pages</ControlLabel>
                                {' '}
                                <FormControl type="number"
                                             value={this.state.pagesRead}
                                             onChange={this.handleChangeProp('pagesRead')}
                                />
                                <FormControl.Feedback />
                            </FormGroup>
                            {' '}
                            <FormGroup style={{"marginLeft": "15px"}} controlId="formValidationError4" validationState={this.getValidationPagesCount()}>
                                <ControlLabel>out of</ControlLabel>
                                {' '}
                                <InputGroup>
                                    <FormControl type="number"
                                                 value={this.state.pagesCount}
                                                 onChange={this.handleChangeProp('pagesCount')}
                                    />
                                </InputGroup>
                                <FormControl.Feedback />
                            </FormGroup>
                        </Form>

                        <FormGroup controlId="formHorizontalTextArea">
                            <Col componentClass={ControlLabel} sm={2}>
                                Started reading
                            </Col>
                            <Col sm={10}>
                                <DateTimeField dateTime={this.state.startedReading} {...startedReadingProps} onChange={date => this.setState({startedReading: date})} mode="date" />
                            </Col>
                        </FormGroup>

                        {this.state.status == 2 ?
                            <FormGroup controlId="formHorizontalTextArea">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Finished reading
                                </Col>
                                <Col sm={10}>
                                    <DateTimeField dateTime={this.state.finishedReading} {...finishedReadingProps} onChange={date => this.setState({finishedReading: date})} mode="date" />
                                </Col>
                            </FormGroup> : ''
                        }

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button disabled={isUpdating} onClick={closeDialogs}>Cancel</Button>
                    <Button disabled={isUpdating || this.getValidationPagesCount() == 'error' || this.getValidationReadCount() == 'error'} bsStyle="primary" onClick={::this.handleUpdateTracking}>Update tracking</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    getValidationPagesCount() {
        const num = this.state.pagesCount;
        if (isNaN(parseInt(num, 10)) || num < 0 || parseInt(num, 10) < parseInt(this.state.pagesRead, 10)) {
            return 'error'
        }
    }

    getValidationReadCount() {
        const num = this.state.pagesRead;
        if (isNaN(parseInt(num, 10)) || parseInt(num, 10) < 0 || num > parseInt(this.state.pagesCount, 10)) {
            return 'error'
        }
    }

    handleChangeProp(key) {
        return (event) => {
            this.setState(
                Object.assign(this.state, {
                    [key]: event.target.value
                })
            );
        }
    }

    handleUpdateTracking() {
        const query = {
            progress: this.state.progress,
            status: this.state.status
        }
        if(this.state.startedReading !== "Invalid date" && this.state.startedReading) {
            query.startedReading = this.state.startedReading;
        }
        if(this.state.finishedReading !== "Invalid date" && this.state.finishedReading) {
            query.finishedReading = this.state.finishedReading;
        }
        query.pagesRead = parseInt(this.state.pagesRead, 10);
        query.pagesCount = parseInt(this.state.pagesCount, 10);
        this.props.updateTracking(this.props.tracking.id, query);
    }

}